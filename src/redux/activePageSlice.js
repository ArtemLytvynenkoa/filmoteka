import { createSlice } from "@reduxjs/toolkit";
import links from "links";

export const activePageSlice = createSlice({
  name: 'activePage',
  initialState: { value: links.filmsPage },
  reducers: {
    setActivePage: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setActivePage } = activePageSlice.actions;