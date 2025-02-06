import {VehicleType} from "@/store/rideStore";
import {axiosInstance} from "@/utils/axiosInstance";

export type GetUserScheduleQuery = {
    riderId: string,
    vehicleType: VehicleType
}

export async function getUserSchedule(payLoad: GetUserScheduleQuery) {
    console.log(payLoad, "this is it")
    const response = 
        await axiosInstance.get(`/Schedule/GetUserSchedule?RiderId=${payLoad.riderId}&Vehincle=${payLoad.vehicleType}`);
    console.log(response.data)
    return response.data.result;
}