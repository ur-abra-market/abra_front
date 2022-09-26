import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryFetch from "../../services/category.service";

const initialState = {
    dateCategories: null,
    currentCategory: [],
    stateCategories: 'nothing',
    messageErrorCategory: '',
}

export const categoryService = createAsyncThunk(
    "category/categoryService",
    async function (_, {rejectWithValue}) {
        try {
            const data = await categoryFetch.getAllCategories();
            return data.result;
        } catch (error) {
            const err = error.response.data.result
                ? error.response.data.result
                : error.message;
            return rejectWithValue(err);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    extraReducers: (bulder) => {
        bulder.addCase(categoryService.pending, (state) => {
            state.dateCategories = null
            state.stateCategories = 'loading'
            state.messageErrorCategory = ''
        })
        bulder.addCase(categoryService.fulfilled, (state, action) => {
            state.dateCategories = action.payload;
            state.stateCategories = 'presence'
            state.messageErrorCategory = ''
        });
        bulder.addCase(categoryService.rejected, (state, action) => {
            state.dateCategories = action.payload;
            state.stateCategories = 'nothing'
            state.messageErrorCategory = action.payload
        });
    },
    reducers: {},
})


export const getCategories = (date) => (state) => {
    const arr = []
    if (state?.category?.dateCategories && date) {
        date.forEach(el => arr.push(el.name))
        return arr
    }
}

export const getChilds = (value, date) => (state) => {
    if (state.category?.dateCategories && value) {
        return date.find(el => el.name === value)?.childs
    }
}

export default categorySlice.reducer;
