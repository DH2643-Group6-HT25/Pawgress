import _ from 'lodash'
import moment from 'moment'
import {
  createPet,
  getPetByUserId,
  updatePetByUserId,
} from '../repository/petRepo'
import { IPet } from '../model/Pets'
import { getStreak } from './streakService'
import { findUserById } from '../repository/usersRepo'
import {
  NoFoodLeftError,
  NoPetFoundError,
  NoUserFoundError,
} from '../utils/errorUtils'
import { IStreak, IStreakHistory } from '../model/Streaks'

interface PetHealthInfo {
  health: number
  mood: string
  food: number
}
interface PetInfo extends PetHealthInfo {
  name: string
  color: string
  currentStreak: number
}

const updatePetHealth = async (
  pet: IPet,
  currentStreak: number,
  streak: IStreak | null
) => {
  const userId = pet.userId.toString()

  if (pet.health > 0 && currentStreak < 1) {
    let declineFactor = 1
    if (streak?.streakHistory?.length > 0) {
      const latestStreak = _.maxBy(
        streak.streakHistory,
        (value: IStreakHistory) => {
          return moment(value.date)
        }
      )
      const petLastUpdate = moment(pet.lastUpdate)
      declineFactor = petLastUpdate.diff(latestStreak.date, 'day')
    }

    const currentHealth = pet.health - declineFactor * 50
    pet.health = _.clamp(currentHealth, 0, Infinity)
  }

  await updatePetByUserId(userId, {
    lastUpdate: moment().toDate(),
    health: pet.health,
  })
  return pet.health
}

const getPetMood = (health: number): string => {
  if (health < 25) return 'sleepy'
  if (health > 74) return 'happy'
  return 'normal'
}

export const getPet = async (userId: string) => {
  const user = await findUserById(userId)
  const pet = await getPetByUserId(userId)
  const streak = await getStreak(userId)

  if (!user) {
    throw new NoUserFoundError('')
  }

  if (!pet) {
    throw new NoPetFoundError('')
  }

  const petInfo: PetInfo = {
    name: pet.name,
    color: pet.color,
    health: pet.health,
    mood: getPetMood(pet.health),
    food: user.food,
    currentStreak: streak?.currentStreak || 0,
  }

  const isUpdatedBeforeToday = moment(pet.lastUpdate)
    .startOf('day')
    .isBefore(moment().startOf('day'))

  if (isUpdatedBeforeToday) {
    petInfo.health = await updatePetHealth(pet, petInfo.currentStreak, streak)
    petInfo.mood = getPetMood(petInfo.health)

    return petInfo
  }

  return petInfo
}

export const assignPet = async (
  userId: string,
  color: string,
  name: string
) => {
  const pet = await createPet(userId, color, name)
  return pet
}

export const increaseFoodByTodo = async (userId: string) => {
  const user = await findUserById(userId)
  if (!user) throw new NoUserFoundError('')

  const score = user?.score || 0

  user.score = score + 5
  user.food = _.toInteger(user.score / 10)
  await user.save()
  return user.food
}

export const feedPet = async (userId: string) => {
  const user = await findUserById(userId)
  if (!user) throw new NoUserFoundError('')

  const pet = await getPetByUserId(userId)
  if (!pet) throw new NoPetFoundError('')

  if (user?.food > 0) {
    user.food -= 1
    user.score -= 10
    pet.health = _.clamp(pet.health + 25, 0, 100)
    pet.lastUpdate = moment().toDate()

    await user.save()
    await pet.save()
    return {
      health: pet.health,
      mood: getPetMood(pet.health),
      food: user.food,
    } as PetHealthInfo
  }

  throw new NoFoodLeftError('')
}
