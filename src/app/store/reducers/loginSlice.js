import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';


const initialState = {
    resMessage: '',
    errMessage: '',
    loading: false,
    isAuth: false
};

export const loginService = createAsyncThunk(
    'login/loginService',
    async function(dataUser, { rejectWithValue }) {
        try {
            const response = await authService.login('login/', dataUser);
            return response.data.result
        } catch (error) {
            const err = error.response.data.result ? error.response.data.result : error.message;
            return rejectWithValue(err);
        }
    }
);


const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (bulder) => {
        bulder.addCase(loginService.pending, (state) => {
            state.resMessage = '';
            state.loading = true;
            state.isAuth = false;
        });
        bulder.addCase(loginService.fulfilled, (state, action) => {
            state.resMessage = action.payload; // response
            state.loading = false;
            state.isAuth = true;
        });
        bulder.addCase(loginService.rejected, (state, action) => {
            state.resMessage = action.payload;
            state.errMessage = action.payload;
            state.loading = false;
            state.isAuth = false;
        });
    },
    reducers: {},
});

export default loginSlice.reducer