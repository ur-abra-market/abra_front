import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  amountItems: 20,
  amountPages: 25,
  activePage: 1,
  allItems: 500,
};

export const paginateSlice = createSlice({
  name: 'paginate',
  initialState,
  reducers: {
    active: (state, action) => {
      state.activePage = action.payload;
    },    
    amount: (state, action) => {
      state.amountItems = action.payload;
      state.amountPages = Math.ceil(state.allItems / action.payload);      
    }
  },
});

export const { active, amount } = paginateSlice.actions;
export default paginateSlice.reducer;
