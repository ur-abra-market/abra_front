import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  basketProduct: [],  
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    changeById: (state, action) => {      
      const id = action.payload.newObj.product_id;
      const sum = action.payload.newObj.sum;
      const index = state.basketProduct.findIndex((obj) => obj.product_id === id);      
      if (index < 0 && sum > 0) {
        state.basketProduct.push(action.payload.newObj)
      } else if (index >= 0 && sum > 0) {
        state.basketProduct[index] = action.payload.newObj;
      } else {
        state.basketProduct = state.basketProduct.filter((_, i) => index !== i);
      }     
    },    

    delById: (state, action) => {
      state.basketProduct = state.basketProduct.filter((obj) => obj.product_id !== action.payload.newObj)      
    },   
    delAll: (state) => {
      state.basketProduct = [];     
    }
  },
});

export const { changeById } = basketSlice.actions;
export default basketSlice.reducer;