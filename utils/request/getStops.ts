import {axiosInstance} from "@/utils/axiosInstance";
import axios from "axios";



    export async function getStops (): Promise<any> {
    const response = await axiosInstance.get('/Stop/GetAll?PageIndex=1&PageSize=100');
    // console.log(response.data, "data")
    return response.data?.stops
}