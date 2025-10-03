import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  email: string | null
  userID: string | null
}

const initialState: UserState = {
  email: null,
  userID: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer
