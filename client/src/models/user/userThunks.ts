import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../utils/errorHandling'
import { login } from '../../api/auth'

interface Credentials {
  email: string
  pass: string
}

export const userLoginThunk = createAsyncThunk(
  'users/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      return await login(credentials.email, credentials.pass)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)
