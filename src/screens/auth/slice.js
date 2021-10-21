import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../app/utils/localStorage";

const initialState = {
  user: loadState("user"),
  api_token: loadState("api_token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiToken: (state, action) => {
      state.api_token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApiToken, setUser } = authSlice.actions;

export default authSlice.reducer;
