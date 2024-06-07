import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService, addtoWishlist } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkApi) => {
    try {
        return await authService.register(userData);
    }
    catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkApi) => {
    try {
        return await authService.login(userData);
    }
    catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist", 
    async (thunkApi) => {
        try{
            return await authService.getUserWishlist();
        }catch(error){
            return thunkApi.rejectWithValue(error);
        }
});

export const addProdToCart = createAsyncThunk(
    "user/cart/add", 
    async (cartData, thunkApi) => {
        try{
            return await authService.addToCart(cartData);
        }catch(error){
            return thunkApi.rejectWithValue(error);
        }
});

export const getUserCart = createAsyncThunk(
    "user/cart/get", 
    async ( thunkApi) => {
        try{
            return await authService.getCart();
        }catch(error){
            return thunkApi.rejectWithValue(error);
        }
});

export const removeProductFromCart = createAsyncThunk(
    "user/cart/remove", 
    async (productId, thunkApi) => {
        try{
            return await authService.removeProductFromCart(productId);
        }catch(error){
            return thunkApi.rejectWithValue(error);
        }
});

export const updateProductQuantityInCart = createAsyncThunk(
    'user/cart/updateProductQuantityInCart',
    async ({productId, quantity}, { rejectWithValue }) => {
        try {
            const response = await authService.updateProductQuantityInCart(productId, quantity);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk (
    'user/logout',
    async ( thunkApi) => {
        try{
            localStorage.removeItem('token');
            return await authService.logout();
        }catch(error){
            return thunkApi.rejectWithValue(error);
        }
    }
);

const getCustomerfromLocalStorage = localStorage.getItem('customer')
    ? JSON.parse(localStorage.getItem('customer')) : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success('User registered successfully');
                }
            }).addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error("Email or Phone already in use");
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem('token', action.payload.token) // Save token in local storage
                    toast.success('User logged in successfully');
                }
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error.message);
                }
            }).addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            }).addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(addProdToCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(addProdToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cart = action.payload;
                if(state.isSuccess === true){
                    toast.success('Product added to cart successfully');
                }
            }).addCase(addProdToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            }).addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(removeProductFromCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
                if(state.isSuccess === true){
                    toast.success('Product removed from cart successfully');
                }
            }).addCase(removeProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(updateProductQuantityInCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateProductQuantityInCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
                if(state.isSuccess === true){
                    toast.success('Product quantity updated successfully');
                }
            }).addCase(updateProductQuantityInCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = null;
                if(state.isSuccess === true){
                    localStorage.removeItem('token');
                    toast.success('User logged out successfully');
                }
            }).addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default authSlice.reducer;
