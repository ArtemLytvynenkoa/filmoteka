import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
  name: 'genres',
  initialState: { value: {
    moviesGenres: [],
    tvGenres: [],
  } },
  reducers: {
    setMoviesGenres: (state, action) => {
      state.value.moviesGenres = action.payload
    },
    setTVGenres: (state, action) => {
      state.value.tvGenres = action.payload
    },
  }
})

export const { setMoviesGenres, setTVGenres } = genresSlice.actions;