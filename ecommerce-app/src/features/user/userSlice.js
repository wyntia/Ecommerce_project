import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
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
                    toast.success(action.error.message);
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
                    localStorage.setItem('toker', action.payload.token) // Save token in local storage
                    toast.success('User logged in successfully');
                }
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.success(action.error.message);
                }
            })
    }
})

export default authSlice.reducer;
