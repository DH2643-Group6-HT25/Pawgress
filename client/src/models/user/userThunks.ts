import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../utils/errorHandling'
import { login, signup } from '../../api/auth'

interface Credentials {
  email: string
  pass: string
}

interface SignupCredentials {
  email: string
  password: string
  name: string
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

export const userSignupThunk = createAsyncThunk(
  'users/signup',
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      return await signup(credentials.email, credentials.password, credentials.name)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)
