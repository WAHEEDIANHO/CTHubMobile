import {axiosInstance} from "@/utils/axiosInstance";

type Schedule = {
    
}


export async function getSchedule(): Promise<any> {
    const response = await axiosInstance.get("/Schedule/Create");
    return response.data;
}