import { createSlice } from "@reduxjs/toolkit";

export const moviesGenresSlice = createSlice({
  name: 'moviesGenres',
  initialState: { value: [] },
  reducers: {
    setMoviesGenres: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setMoviesGenres } = moviesGenresSlice.actions;