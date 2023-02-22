import { configureStore } from '@reduxjs/toolkit'
import { moviesGenresSlice } from './moviesGenresSlice'
import { searchQuerySlice } from './searchQuerySlice'
import { pageNumSlice } from './pageNumSlice'
import { tvGenresSlice } from './tvGenresSlice'

export const store = configureStore({
  reducer: {
    moviesGenres: moviesGenresSlice.reducer,
    tvGenres: tvGenresSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
    pageNum: pageNumSlice.reducer,
  },
})