import type { Dispatch } from '@reduxjs/toolkit'
import {
  petCreationSubmitted,
  petSubmissionFailed,
  startPetSubmission,
  type BasicPetInfo,
} from './petReducer'
import { postNewPet } from '../../api/pet'

export const createPetThunk =
  (name: string, color: string) => async (dispatch: Dispatch) => {
    dispatch(startPetSubmission())

    try {
      const data = await postNewPet(name, color)
      if (data && data.pet) {
        const basicInfo: BasicPetInfo = {
          name: data.pet?.name || '',
          color: data.pet?.color || '',
        }
        dispatch(petCreationSubmitted(basicInfo))
      } else {
        throw new Error('Invalid data from server')
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(petSubmissionFailed(error.message))
      } else {
        dispatch(
          petSubmissionFailed('Unknown error when trying to submit pet data')
        )
      }
    }
  }
