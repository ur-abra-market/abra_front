import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort_type: 'rating',  
  category: 0,  
  price_from: 0,
  price_to: 0,
  discount: false,
  ascending: false,
  brands: [],
  materials: [],
  sizes: [],
  reset: Array(9).fill(false),
 };

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {    
    category: (state, action) => {
      state.category = action.payload;      
    },  
    sort: (state, action) => {
      state.sort_type = action.payload;      
    },   
    priceFrom: (state, action) => {
      state.price_from = +action.payload;      
    },
    priceTo: (state, action) => {
      state.price_to = +action.payload;            
    },
    discount: (state, action) => {
      state.discount = action.payload ;                
    },
    brand: (state, action) => {
      state.brands = [...action.payload];                
    },
    material: (state, action) => {
      state.materials = [...action.payload];                
    },
    size: (state, action) => {
      state.sizes = [...action.payload];                
    },  
    ascending: (state, action) => {
      state.ascending = action.payload;                
    },     
    reset: (state, action) => {
      state.reset = action.payload;                
    },
  },
});

export const { category, sort, priceFrom, priceTo, discount, brand, material, size, ascending, reset } = filterSlice.actions;
export default filterSlice.reducer;
