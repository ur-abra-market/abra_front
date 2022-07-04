import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = {
  auth: null,
  error: null,
  isLoggedIn: true,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
  },
});
const { reducer: userReducer, actions } = usersSlice;
const { authRequestSuccess, authRequestFailed, userLoggedOut } = actions;

const authRequested = createAction("user/authRequested");

export const login =
  ({ payload }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      dispatch(authRequestSuccess({ userId: data.localId }));
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else dispatch(authRequestFailed(error.message));
    }
  };

export const signUp =
  ({ email, password, status, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password, status });
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          ...rest,
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

function createUser(payload) {
  return async function () {
    try {
      console.log(payload);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const logOut = () => (dispatch) => {
  dispatch(userLoggedOut());
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getAuthErrors = () => (state) => state.user;

export default userReducer;
