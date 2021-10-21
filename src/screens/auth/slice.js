import { createSlice } from "@reduxjs/toolkit";

import { loadState } from "../../app/utils/localStorage";

const initialState = {
  currentUser: loadState("currentUser"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
