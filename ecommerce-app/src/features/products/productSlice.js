import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk("product/get", async (thunkApi) => {
    try {
        return await productService.getProducts();
    }
    catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk("product/getAProduct", async (id,thunkApi) => {
    try {
        return await productService.getSingleProduct(id);
    }
    catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


export const addToWishlist = createAsyncThunk("product/wishlist", async (prodId, thunkApi) => {
    try {
        return await productService.addToWishlist(prodId);
    }
    catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

const productState= {
    product: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const productSlice = createSlice({
    name: 'product',
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            }).addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishlist = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Success');
                }
            }).addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            }).addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload;
                state.message = 'Product fetched successfully';
            }).addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default productSlice.reducer;
