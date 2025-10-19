import { createAsyncThunk, type Dispatch } from '@reduxjs/toolkit'
import {
  petCreationSubmitted,
  petSubmissionFailed,
  startPetSubmission,
  type BasicPetInfo,
} from './petReducer'
import { convertTodoToFood, getPetInfo, postNewPet } from '../../api/pet'
import petStorePrefix from './petStorePrefix'
import { getErrorMessage } from '../../utils/errorHandling'

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

export const petInfoThunk = createAsyncThunk(
  `${petStorePrefix}/info`,
  async (_, { rejectWithValue }) => {
    try {
      return await getPetInfo()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const petTodoToFoodThunk = createAsyncThunk(
  `${petStorePrefix}/todoToFood`,
  async (_, { rejectWithValue }) => {
    try {
      return await convertTodoToFood()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)
