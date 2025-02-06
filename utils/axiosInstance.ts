import axios from "axios";
import {getSaveToken} from "@/utils/getSaveToken";

export const axiosInstance = axios.create({
    baseURL: "http://192.168.0.125:5125", //https://192.168.122.1:7107 "http://localhost:5125", https://jsonplaceholder.typicode.com
    headers: {
        'Content-Type': "application/json"
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = getSaveToken();
    console.log(token,  "token here")
    if (token != null) config.headers.Authorization = `Bearer ${token}`
    return config
}, (error) => {});