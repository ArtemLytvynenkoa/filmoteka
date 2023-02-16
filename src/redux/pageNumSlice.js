import { createSlice } from "@reduxjs/toolkit";

export const pageNumSlice = createSlice({
  name: 'pageNum',
  initialState: { value: 1 },
  reducers: {
    setPageNum: (state, action) => {
      state.value = action.payload;
    },
  }
})

export const { setPageNum } = pageNumSlice.actions;