'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: UserInterface = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<UserInterface>) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
  },
})

export const { addUserToStore } = userSlice.actions

export default userSlice.reducer
