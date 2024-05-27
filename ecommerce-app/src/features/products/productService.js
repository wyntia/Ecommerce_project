import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';

const getProducts = async(data)=>{
    let brandsQuery = '';
    
    if (data?.brands) {
        const brands = Array.isArray(data.brands) ? data.brands : [data.brands];
        brandsQuery = brands.map(brand => `brand=${brand}`).join('&');
    }
    const response = await axios.get(`${base_url}product?${brandsQuery}`);
    if(response.data){
        return response.data;
    }
}

const getSingleProduct = async(id)=>{
    const response = await axios.get(`${base_url}product/${id}`);
    if(response.data){
        return response.data;
    }
}

const addToWishlist = async(prodId)=>{
    const response = await axios.put(`${base_url}product/wishlist`, {prodId}, config());
    if(response.data){
        return response.data;
    }
}

export const rateProduct= async (data) => {
    const response = await axios.put(`${base_url}product/rating`, data, config());
    if(response.data){
        return response.data;
    }
  };

export const productService = {
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct
};