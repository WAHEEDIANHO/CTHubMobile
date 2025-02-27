import {Ride, RideType, VehicleType} from "@/store/rideStore";
import {axiosInstance} from "@/utils/axiosInstance";

type PayLoad = {
    driverId: string;
    latitude: string;
    longitude: string;
    vehincle: VehicleType;
    token: string;
}

export async function joinQueue(payLoad: PayLoad) {
    console.log(payLoad, "this is the payload")
    const response =  await axiosInstance.post("/DriverQueue/Enqueue", payLoad);
    return response.data;
}