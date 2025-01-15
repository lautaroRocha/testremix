import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"

// IMPORT SLICE
import branchSlice from "./slices/branchSlice"
import tenantSlice from "./slices/tenantSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    // ADD SLICE
    branch: branchSlice,
    tenant: tenantSlice
  },
  devTools: process.env.NODE_ENV !== "production" //disable redux extension when in production
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
