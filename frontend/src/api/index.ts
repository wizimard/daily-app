import axios from "axios";
import { checkAuthApi } from "./authApi";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
});

$api.interceptors.request.use((config) => {
    config.headers = {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Content-Type': "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE OPTIONS",
        'Accept': '*',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config;
});
$api.interceptors.response.use((config) => {
    return config;
}, async(error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await checkAuthApi();

            localStorage.setItem('token', response.data.accessToken);
    
            return $api.request(originalRequest);
        } catch(e) {
            console.log('User is unauthorized');
        }
    }
    if (error.response.status === 404) {
        return window.location.href = '/404';
    }
    if (error.response.status !== 401 || error.response.status !== 404) {
        return Promise.reject(error);
    }
});

export default $api;