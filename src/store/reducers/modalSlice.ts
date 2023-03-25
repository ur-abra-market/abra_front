import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isAddress: false as boolean,
    isPayment: false as boolean,
    address: {
      isMain: false as boolean,
      firstname: '' as string,
      lastname: '' as string,
      phone: '' as string,
      street: '' as string,
      building: '' as string,
      apartment: '' as string,
      city: '' as string,
      region: '' as string,
      state: '' as string,
      country: '' as string,
      zipcode: '' as string,
    },
    addresses: [],
  },

  reducers: {
    address: (state, action) => {
      state.isAddress = action.payload;
    },
    payment: (state, action) => {
      state.isPayment = action.payload;
    },
    main: (state, action) => {
      state.address.isMain = action.payload;
    },
    firstname: (state, action) => {
      state.address.firstname = action.payload;
    },
    lastname: (state, action) => {
      state.address.lastname = action.payload;
    },
    phone: (state, action) => {
      state.address.phone = action.payload;
    },
    street: (state, action) => {
      state.address.street = action.payload;
    },
    building: (state, action) => {
      state.address.building = action.payload;
    },
    apartment: (state, action) => {
      state.address.apartment = action.payload;
    },
    city: (state, action) => {
      state.address.city = action.payload;
    },
    region: (state, action) => {
      state.address.region = action.payload;
    },
    state: (state, action) => {
      state.address.state = action.payload;
    },
    country: (state, action) => {
      state.address.country = action.payload;
    },
    zipcode: (state, action) => {
      state.address.zipcode = action.payload;
    },
    addAddress: (state, action) => {
      // @ts-ignore
      state.addresses.push(action.payload);
    },
    addressNull: state => {
      state.address.isMain = false;
      state.address.firstname = '';
      state.address.lastname = '';
      state.address.phone = '';
      state.address.street = '';
      state.address.building = '';
      state.address.apartment = '';
      state.address.city = '';
      state.address.region = '';
      state.address.state = '';
      state.address.country = '';
      state.address.zipcode = '';
    },
  },
});

export const {
  address,
  payment,
  main,
  firstname,
  lastname,
  phone,
  street,
  building,
  apartment,
  city,
  region,
  state,
  country,
  zipcode,
  addAddress,
  addressNull,
} = modalSlice.actions;
export default modalSlice.reducer;
