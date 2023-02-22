import { createSlice } from "@reduxjs/toolkit";

export const tvGenresSlice = createSlice({
  name: 'tvGenres',
  initialState: { value: [] },
  reducers: {
    setTVGenres: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setTVGenres } = tvGenresSlice.actions;