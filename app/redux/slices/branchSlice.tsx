import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BranchOffice } from "../../@types"

interface Branch {
  selected: BranchOffice
}

const initialState = {} as Branch

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    reset: () => initialState,
    setSelectedBranch: (state, action: PayloadAction<BranchOffice>) => {
      state.selected = action.payload
    }
  }
})

export const { reset, setSelectedBranch } = branchSlice.actions

export default branchSlice.reducer
