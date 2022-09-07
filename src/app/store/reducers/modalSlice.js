import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  isAddress: false,
  isPayment: false,
  mainAddress: {
    main: false,
    firstname: '',
    lastname: '',
    phone: '',
    street: '',
    building: '',
    apartment: '',
    city: '',
    region: '',
    state: '',
    country: '',
    zipcode: ''
  },
 addresses: []
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    address: (state, action) => {
      state.isAddress = action.payload;
    },    
    payment: (state, action) => {
      state.isPayment = action.payload;            
    }
  },
});

export const { address, payment } = modalSlice.actions;
export default modalSlice.reducer;
