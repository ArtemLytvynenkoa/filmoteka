import { createSlice } from "@reduxjs/toolkit";

export const userListActiveKeySlice = createSlice({
  name: 'userListActiveKey',
  initialState: { value: 'watched' },
  reducers: {
    setUserListActiveKey: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setUserListActiveKey } = userListActiveKeySlice.actions;