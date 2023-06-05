import { createSlice } from '@reduxjs/toolkit';

import { IPersonalInfoRequestData } from '../../../common/types';

interface ISupplierSliceInitialState {
  personalInfo: IPersonalInfoRequestData;
}

const initialState: ISupplierSliceInitialState = {
  personalInfo: {
    first_name: '',
    last_name: '',
    phone_country_code: '',
    phone_number: '',
  },
};

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});
