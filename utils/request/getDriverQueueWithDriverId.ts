import {VehicleType} from "@/store/rideStore";
import {axiosInstance} from "@/utils/axiosInstance";

export type getDriverQueueWithDriverIdQuery = {
    driverId: string,
}

export async function getDriverQueueWithDriverId(payLoad: getDriverQueueWithDriverIdQuery) {
    const response =
        await axiosInstance.get(`/DriverQueue/GetQueueByDriverId/${payLoad.driverId}`);
    // console.log(response.data)
    return response.data;
}