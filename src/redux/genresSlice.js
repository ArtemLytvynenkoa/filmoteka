import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
  name: 'genres',
  initialState: { value: [] },
  reducers: {
    setGenres: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setGenres } = genresSlice.actions;