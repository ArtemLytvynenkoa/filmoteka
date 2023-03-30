import { createSlice } from "@reduxjs/toolkit";

export const activePageSlice = createSlice({
  name: 'activePage',
  initialState: { value: '' },
  reducers: {
    setActivePage: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setActivePage } = activePageSlice.actions;