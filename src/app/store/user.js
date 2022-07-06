import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
const { reducer: userReducer, actions } = usersSlice;
const { userLoggedOut } = actions;

export const login = createAsyncThunk("user/login", async ({ payload }) => {
  const data = await authService.login(payload);
  return data;
});

export const signUp = createAsyncThunk(
  "user/sigUp",
  async ({ status, ...rest }) => {
    const data = await authService.register({ status, ...rest });
    createUser({ ...rest });
    return data;
  }
);

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
export const getAuthErrors = () => (state) => state.user.error;

export default userReducer;
