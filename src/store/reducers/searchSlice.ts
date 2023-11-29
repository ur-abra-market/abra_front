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
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
