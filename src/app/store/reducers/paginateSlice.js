import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  amountItems: 20,
  amountPages: 30,
  activePage: 1,
  // items: 500,
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
        state.amountPages = Math.ceil(state.items / action.payload);      
      }
    },
  });
  
  export const { active, amount } = paginateSlice.actions;
  export default paginateSlice.reducer;
  