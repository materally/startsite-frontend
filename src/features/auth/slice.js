import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  api_token: "",
  isLogged: false,
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
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApiToken, setUser, setIsLogged } = authSlice.actions;

export default authSlice.reducer;
