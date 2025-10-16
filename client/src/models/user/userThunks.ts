import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../utils/errorHandling'
import { login, logout, signup, verifyToken } from '../../api/auth'
import userStorePrefix from './userStorePrefix'

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
  `${userStorePrefix}/login`,
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      return await login(credentials.email, credentials.pass)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const userSignupThunk = createAsyncThunk(
  `${userStorePrefix}/signup`,
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      return await signup(
        credentials.email,
        credentials.password,
        credentials.name
      )
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const userLogoutThunk = createAsyncThunk(
  `${userStorePrefix}/logout`,
  async (_, { rejectWithValue }) => {
    try {
      await logout()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const userVerifyThunk = createAsyncThunk(
  `${userStorePrefix}/token`,
  async (_, { rejectWithValue }) => {
    try {
      await verifyToken()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)
