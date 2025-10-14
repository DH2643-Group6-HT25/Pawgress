import type { Dispatch } from '@reduxjs/toolkit'
import {
  setInitialPetInfo,
  setPetError,
  setPetLoading,
  type BasicPetInfo,
} from './petReducer'
import { postNewPet } from '../../api/pet'

export const createPetThunk =
  (name: string, color: string) => async (dispatch: Dispatch) => {
    dispatch(setPetLoading(true))
    dispatch(setPetError(null))

    try {
      const data = await postNewPet(name, color)
      if (data && data.pet) {
        const basicInfo: BasicPetInfo = {
          name: data.pet?.name || '',
          color: data.pet?.color || '',
        }
        dispatch(setInitialPetInfo(basicInfo))
      }
      throw new Error('Invalid data from server')
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setPetError(error.message))
      } else {
        dispatch(setPetError('Unknown error when trying to submit pet data'))
      }
      dispatch(setPetLoading(false))
    } finally {
      dispatch(setPetLoading(false))
    }
  }
