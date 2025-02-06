import {axiosInstance} from "@/utils/axiosInstance";

type Payload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}


export const register = async (payload: Payload) => {
    const resp = await axiosInstance.post('/Authentication/RegisterRider', payload);
    return resp.data;
}
