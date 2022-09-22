import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountInfo: {},
};

const formRegistrationSlice = createSlice({
    name: "formRegistration",
    initialState,
    reducers: {
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
        }
    },
});


export const { setAccountInfo } = formRegistrationSlice.actions
export default formRegistrationSlice.reducer