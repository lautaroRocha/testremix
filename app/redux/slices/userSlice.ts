import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface User {
  userName: string
  userMail: string
  userPic: string | null
}

const initialState = {
  userName: "Nombre de Usuario",
  userMail: "usuario@gmail.com",
  userPic: null
} as User

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User>) {
      const { userName, userMail, userPic } = action.payload
      state.userName = userName
      state.userMail = userMail
      state.userPic = userPic
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload
    },
    resetUserData: () => initialState
  }
})

export const { setUserData, resetUserData, setUserName } = userSlice.actions

export default userSlice.reducer
