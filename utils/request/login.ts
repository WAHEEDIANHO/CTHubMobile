import {axiosInstance} from "@/utils/axiosInstance";
import axios from "axios";

type PayLoad = {
    email: string;
    password: string;
}

export async function login (payload: PayLoad) {
        const response = await axiosInstance.post('/Authentication/Login', payload);
        return response.data
}