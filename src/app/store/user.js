import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = {
  auth: null,
  error: null,
  isLoggedIn: true,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const data = await authService.login(payload);
      return data;
    } catch (error) {
      const { code, message } = error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/sigUp",
  async ({ status, ...rest }, { rejectWithValue }) => {
    try {
      const data = await authService.register({ status, ...rest });
      createUser({ ...rest });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
      })
      .addCase(signUp.pending, (state) => {
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const { reducer: userReducer, actions } = usersSlice;
const { userLoggedOut } = actions;

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
