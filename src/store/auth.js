import { createSlice } from "@reduxjs/toolkit";
const userFromLocalStorage = localStorage.getItem('user');
const initialState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
};
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { login, logut } = auth.actions;
export default auth.reducer;
