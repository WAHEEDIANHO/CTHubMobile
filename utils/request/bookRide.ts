import {Ride, RideType, VehicleType} from "@/store/rideStore";
import {axiosInstance} from "@/utils/axiosInstance";

type PayLoad = {
    startStopId: string;
    endStopId: string;
    rideType: RideType;
    vehincleType: VehicleType;
    riderId: string;
}

export async function bookRide(payLoad: Ride) {
    const response =  await axiosInstance.post("/Ride/Create", payLoad);
    return response.data;
}