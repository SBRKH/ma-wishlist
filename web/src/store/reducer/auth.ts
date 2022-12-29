import {createSlice} from "@reduxjs/toolkit";
import {UserManager} from "../../storage/UserStorageManager";
import {TokenManager} from "../../storage/TokenStorageManager";


const tokenManager = new TokenManager();
const userManager = new UserManager();

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: tokenManager.getToken(),
    refreshToken: tokenManager.getRefreshToken(),
    user: userManager.getUser()
  },
  reducers: {
    get: (state) => state,
    setUser: (state, action) => {
      userManager.setUser(action.payload);
      state.user = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload !== tokenManager.getToken()) {
        tokenManager.setToken(action.payload);
      }
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      if (action.payload !== tokenManager.getToken()) {
        tokenManager.setRefreshToken(action.payload);
      }
      state.token = action.payload;
    },
    logout: (state) => {
      tokenManager.deleteToken();
      tokenManager.deleteRefreshToken();
      userManager.deleteUser();
      state.user = null;
    }
  },

});

export const authActions = auth.actions;
export const authReducer = auth.reducer;