import { createSlice } from '@reduxjs/toolkit'
export type TUser = {
  id:string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

type TAuthState = {
  user: TUser | null;
  token: string | null;
}
const initialState: TAuthState = {
  user: null,
  token: null
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    }

  }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;