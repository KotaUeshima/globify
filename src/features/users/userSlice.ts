'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: UserInterface = {
  userId: 0,
  username: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<UserInterface>) => {
      state.userId = action.payload.userId
      state.username = action.payload.username
    },
  },
})

export const { addUserToStore } = userSlice.actions

export default userSlice.reducer
