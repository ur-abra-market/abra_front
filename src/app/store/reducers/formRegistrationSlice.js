import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import formRegistrationService from '../../services/formRegistration.service';

const initialState = {
    accountInfo: {},
    resMessage: '',
    errMessage: '',
    loading: false
};

export const accountInfoService = createAsyncThunk(
    'formRegistration/accountInfoService',
    async ({ path, ...rest }, { rejectWithValue }) => {
        console.log('rest',rest);
        try {
            const response = await formRegistrationService.suppliers({ path, ...rest });
            return response.result;
        } catch (error) {
            const err = error.response.data.result ? error.response.data.result : error.message;
            return rejectWithValue(err);
        }
    }
);


const formRegistrationSlice = createSlice({
    name: "formRegistration",
    initialState,
    extraReducers: (bulder) => {
        bulder.addCase(accountInfoService.pending, (state) => {
            state.resMessage = '';
            state.loading = true;
        });
        bulder.addCase(accountInfoService.fulfilled, (state, action) => {
            state.resMessage = action.payload; // response
            state.loading = false;
        });
        bulder.addCase(accountInfoService.rejected, (state, action) => {
            state.resMessage = action.payload;
            state.errMessage = action.payload;
            state.loading = false;
        });
    },
    reducers: {
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
        }
    },
});


export const { setAccountInfo } = formRegistrationSlice.actions
export default formRegistrationSlice.reducer