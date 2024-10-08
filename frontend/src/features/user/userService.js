import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';

const register = async(userData)=>{
    const response = await axios.post(`${base_url}user/register`, userData);
    if(response.data){
        localStorage.setItem('customer', JSON.stringify(response.data));
        return response.data;
    }
}

const login = async(userData)=>{
    const response = await axios.post(`${base_url}user/login`, userData);
    if(response.data){
        localStorage.setItem('customer', JSON.stringify(response.data));
        return response.data;
    }
}

const getUserWishlist = async()=>{
    const response = await axios.get(`${base_url}user/wishlist`, config());
    if(response.data){
        return response.data;
    }
}

const addToCart = async(cartData) => {
    const { product, quantity, color, price } = cartData;
    const data = { productId: product, quantity, color, price };
    const response = await axios.post(`${base_url}user/cart`, data, config());
    if(response.data){
        return response.data;
    }
}

const getCart= async()=>{
    const response = await axios.get(`${base_url}user/cart`, config());
    if(response.data){
        return response.data;
    }
}

const removeProductFromCart = async(productId)=>{
    const response = await axios.delete(`${base_url}user/cart/${productId}`, config());
    if(response.data){
        return response.data;
    }
}

const updateProductQuantityInCart = async(productId, quantity)=>{
    const data = { quantity };
    const response = await axios.put(`${base_url}user/cart/${productId}`, data, config());
    if(response.data){
        return response.data;
    }
}

const logout = async() => {
    const response = await axios.post(`${base_url}user/logout`, {}, config());
    if(response.data){
        localStorage.removeItem('customer');
        return response.data;
    }

}

export const authService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductQuantityInCart,
    logout
};