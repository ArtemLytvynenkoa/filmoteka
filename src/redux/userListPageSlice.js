import { createSlice } from "@reduxjs/toolkit";

export const userListPageSlice = createSlice({
  name: 'moviesGenres',
  initialState: { value: {
    prev: null,
    next: null,
  } },
  reducers: {
    setNextPage: (state, action) => {
      state.value.next = action.payload
    },
    setPrevPage: (state, action) => {
      state.value.prev = action.payload
    }
  }
})

export const { setNextPage,  setPrevPage } = userListPageSlice.actions;