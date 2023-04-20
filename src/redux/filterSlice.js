import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: {
    filters: {
      genre: '',
      year: '',
      vote: '',
    },
    isOpen: false,
  } },
  reducers: {
    setFilterGenres: (state, action) => {
      state.value.filters.genre = action.payload
    },
    setFilterYear: (state, action) => {
      state.value.filters.year = action.payload
    },
    setFilterVote: (state, action) => {
      state.value.filters.vote = action.payload
    },
    setFilterIsOpen: (state, action) => {
      state.value.isOpen = action.payload
    },
    resetFilters: state => {
      state.value.filters = {
        genre: '',
        year: '',
        vote: '',
      }
    },
  }
})

export const { setFilterGenres, setFilterYear, setFilterVote, resetFilters, setFilterIsOpen } = filterSlice.actions;