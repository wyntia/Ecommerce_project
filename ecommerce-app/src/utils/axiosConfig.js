export const base_url = 'http://localhost:5000/api/';

const getTokenFromLocalStorage = localStorage.getItem('token') || null;
// ? JSON.parse(localStorage.getItem('customer')) : null;

export const config =() => {
    return {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage}`,
            Accept: 'application/json',
        },
    }
}