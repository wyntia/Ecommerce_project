import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk("product/get", async (data, thunkApi) => {
    try {
        return await productService.getProducts(data);
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

export const addRating = createAsyncThunk(
    'product/rating',
    async (data, thunkApi) => {
        try{
            return await productService.rateProduct(data);
        }
        catch(error){
            return thunkApi.rejectWithValue(error);
        }
    }
  );

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
            }).addCase(addRating.pending, (state) => {
                state.isLoading = true;
            }).addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                state.message = 'Rating added successfully';
                if (state.isSuccess === true) {
                    toast.success('Rating added successfully');
                }
            }).addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;});

    }
})

export default productSlice.reducer;
