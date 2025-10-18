import { createSlice } from '@reduxjs/toolkit'
import {
  userLoginThunk,
  userLogoutThunk,
  userSignupThunk,
  userVerifyThunk,
} from './userThunks'
import userStorePrefix from './userStorePrefix'

interface UserState {
  email: string
  password: string
  name: string
  msg: string
  userID: string | null
  loading: boolean
  loggedIn: boolean
  isCredentialLoading: boolean
  sessionError: string | null
  hasPet: boolean
}

const initialState: UserState = {
  email: '',
  password: '',
  name: '',
  msg: '',
  userID: null,
  loading: false,
  loggedIn: false,
  isCredentialLoading: false,
  sessionError: null,
  hasPet: false,
}

export const userSlice = createSlice({
  name: userStorePrefix,
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setMsg: (state, action) => {
      state.msg = action.payload
    },
    setSessionError: (state) => {
      state.sessionError = 'Please sign up / log in again'
    },
    clearSessionError: (state) => {
      state.sessionError = null
    },
    setPetOwned: (state) => {
      state.hasPet = true
    },
    setLoginSuccess: (state) => {
      state.loggedIn = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true
        state.msg = ''
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.msg = ''
        state.loggedIn = true
        state.userID = action.payload.user?.id || null
        state.password = ''
        state.hasPet = action.payload.user?.hasPet || false
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.loading = false
        state.msg = action.payload as string
      })
      .addCase(userSignupThunk.pending, (state) => {
        state.loading = true
        state.msg = ''
      })
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.loading = false
        state.msg = ''
        state.loggedIn = true
        state.userID = action.payload.user?.id || null
        state.password = ''
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.loading = false
        state.msg = action.payload as string
      })
      .addCase(userVerifyThunk.pending, (state) => {
        state.isCredentialLoading = true
      })
      .addCase(userVerifyThunk.fulfilled, (state) => {
        state.isCredentialLoading = false
        state.loggedIn = true
      })
      .addCase(userVerifyThunk.rejected, (state) => {
        state.isCredentialLoading = false
        state.userID = initialState.userID
        state.loggedIn = initialState.loggedIn
      })
      .addCase(userLogoutThunk.pending, (state) => {
        state.isCredentialLoading = true
      })
      .addCase(userLogoutThunk.fulfilled, (state) => {
        state.isCredentialLoading = false
        state.userID = initialState.userID
        state.loggedIn = initialState.loggedIn
        state.loading = initialState.loading
        state.name = initialState.name
        state.email = initialState.email
        state.hasPet = initialState.hasPet
      })
      .addCase(userLogoutThunk.rejected, (state) => {
        state.isCredentialLoading = false
        state.msg = 'Logout Unsucessful'
      })
  },
})

export const {
  setEmail,
  setPassword,
  setName,
  setMsg,
  setSessionError,
  clearSessionError,
  setPetOwned,
  setLoginSuccess,
} = userSlice.actions
export default userSlice.reducer
