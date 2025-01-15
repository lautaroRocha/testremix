import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

interface Tenant {
  id: string
  image: string
  isLogged?: boolean
}

const initialState = {
  id: Cookies.get("tenant"),
  image: Cookies.get("image"),
  isLogged: Boolean(Cookies.get("accessToken"))
} as Tenant

export const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    reset: () => initialState,
    setTenant: (state, action: PayloadAction<Tenant>) => {
      const { id, image } = action.payload
      state.id = id
      state.image = image
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
    }
  }
})

export const { reset, setTenant, setIsLogged } = tenantSlice.actions

export default tenantSlice.reducer
