import { configureStore } from '@reduxjs/toolkit'
import { genresSlice } from './genresSlice'
import { searchQuerySlice } from './searchQuerySlice'
import { pageNumSlice } from './pageNumSlice'

export const store = configureStore({
  reducer: {
    genres: genresSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
    pageNum: pageNumSlice.reducer,
  },
})