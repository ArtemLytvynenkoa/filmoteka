import { configureStore } from '@reduxjs/toolkit';
import { searchQuerySlice } from './searchQuerySlice';
import { pageNumSlice } from './pageNumSlice';
import { activePageSlice } from './activePageSlice';
import { userListActiveKeySlice } from './userListActiveKeySlice';
import { filterSlice } from './filterSlice';
import { genresSlice } from './genresSlice';

export const store = configureStore({
  reducer: {
    genres: genresSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
    pageNum: pageNumSlice.reducer,
    activePage: activePageSlice.reducer,
    userListActiveKey: userListActiveKeySlice.reducer,
    filter: filterSlice.reducer
  },
})