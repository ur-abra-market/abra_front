import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  address: false,
  payment: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    address: (state, action) => {
      state.address = action.payload;
    },    
    payment: (state, action) => {
      state.payment = action.payload;            
    }
  },
});

export const { address, payment } = modalSlice.actions;
export default modalSlice.reducer;
