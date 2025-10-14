import moment from 'moment'
import { createPet, getPetById, getPetByUserId } from '../repository/petRepo'

const updatePetHealth = () => {}

export const getPet = async (id: string) => {
  const pet = await getPetById(id)
  if (!pet) {
    return null
  }

  const isUpdatedBeforeToday = moment(pet.lastUpdate)
    .startOf('day')
    .isBefore(moment().startOf('day'))

  if (isUpdatedBeforeToday) {
    updatePetHealth()
    return pet
  }

  return pet
}

export const assignPet = async (
  userId: string,
  color: string,
  name: string
) => {
  const pet = await createPet(userId, color, name)
  return pet
}
