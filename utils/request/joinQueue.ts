import {Ride, RideType, VehicleType} from "@/store/rideStore";
import {axiosInstance} from "@/utils/axiosInstance";

type PayLoad = {
    driverId: string;
    latitude: string;
    longitude: string;
    vehincle: VehicleType;
}

export async function joinQueue(payLoad: PayLoad) {
    const response =  await axiosInstance.post("/DriverQueue/Enqueue", payLoad);
    return response.data;
}