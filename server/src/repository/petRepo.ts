import moment from 'moment'
import PetModel from '../model/Pets'

export const getPetByUserId = async (userId: string) => {
  return PetModel.findOne({ userId })
}

export const getPetById = async (id: string) => {
  return PetModel.findOne({ id })
}

export const createPet = async (
  userId: string,
  color: string,
  name: string
) => {
  return PetModel.create({
    userId,
    name: name,
    color: color,
    health: 100,
    lastUpdate: moment.now(),
  })
}
