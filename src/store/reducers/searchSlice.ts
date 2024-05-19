import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValues: {
    mainSearch: '',
    search: '',
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMainSearchValue: (state, action) => {
      state.searchValues.mainSearch = action.payload;
    },
    clearMainSearchValue: state => {
      state.searchValues.mainSearch = '';
    },
    setSearchValue: (state, action) => {
      state.searchValues.search = action.payload;
    },
    clearSearchValue: state => {
      state.searchValues.search = '';
    },
  },
});

export const {
  setMainSearchValue,
  clearMainSearchValue,
  setSearchValue,
  clearSearchValue,
} = searchSlice.actions;
export default searchSlice.reducer;
