import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../const/const';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions';
import { AuthData } from '../../../types/auth-data';

type UserStateType = {
  authorizationStatus: AuthorizationStatus;
  user: AuthData | null;
  loginStatus: { pending: boolean; rejected: boolean };
};

const initialState: UserStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  loginStatus: { pending: false, rejected: false, }
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeAuthorizationStatus: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
  extraReducers(bulder) {
    bulder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.loginStatus.pending = false;
        state.loginStatus.rejected = false;
      })
      .addCase(loginAction.pending, (state) =>{
        state.loginStatus.pending = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loginStatus.pending = false;
        state.loginStatus.rejected = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});

export const { changeAuthorizationStatus } = userSlice.actions;
