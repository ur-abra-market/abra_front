import { createSlice } from '@reduxjs/toolkit';

type ISearchType = {
  value: string;
};
const initialState: ISearchType = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
