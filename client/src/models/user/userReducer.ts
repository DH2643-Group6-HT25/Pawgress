import { createSlice } from '@reduxjs/toolkit'
import { userLoginThunk, userSignupThunk } from './userThunks'

interface UserState {
  email: string
  password: string
  name: string
  msg: string
  userID: string | null
  loading: boolean
  loggedIn: boolean
}

const initialState: UserState = {
  email: '',
  password: '',
  name: '',
  msg: '',
  userID: null,
  loading: false,
  loggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
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
    logout: (state) => {
      state.loggedIn = false
      state.email = ''
      state.password = ''
      state.name = ''
      state.msg = ''
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
        state.msg = action.payload.message || 'Login successful'
        state.loggedIn = true
        state.userID = action.payload.user?.id || null;
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
        state.msg = action.payload.message || 'Signup successful'
        state.loggedIn = true
        state.userID = action.payload.user?.id || null;
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.loading = false
        state.msg = action.payload as string
      })
  },
})

export const { setEmail, setPassword, setName, setMsg, logout } = userSlice.actions
export default userSlice.reducer
