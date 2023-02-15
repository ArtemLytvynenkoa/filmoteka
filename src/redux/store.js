import { configureStore } from '@reduxjs/toolkit'
import { genresSlice } from './genresSlice'

export const store = configureStore({
  reducer: {
    genres: genresSlice.reducer
  },
})