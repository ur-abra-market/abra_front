import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Status} from '../enums/status.enum'
import {productFetch} from '../../services/product.service'

export const getPopularProductsById = createAsyncThunk(
    'popularProducts/getPopularProducts',
    async function ({product_id}, {rejectWithValue}) {
        try {
            const {result} = await productFetch.getPopularProductById({product_id})

            return result
        } catch (error) {
            const err = error.data.detail
                ? error.data.detail
                : error.message
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    popularProducts: [],
    status: Status.Idle,
}

export const popularProductsSlice = createSlice({
    name: 'popularProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPopularProductsById.pending, (state) => {
            state.status = Status.Loading
        })
        builder.addCase(getPopularProductsById.fulfilled, (state, action) => {
            state.popularProducts = action.payload
            state.status = Status.Success
        })
        builder.addCase(getPopularProductsById.rejected, (state) => {
            state.popularProducts = []
            state.status = Status.Failed
        })
    },
    reducers: {}
})

export const popularProductsReducer = popularProductsSlice.reducer
