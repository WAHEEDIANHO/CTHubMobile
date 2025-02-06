import VehincleTypeLayout from "@/components/booking/VehincleTypeLayout";
import {create} from "zustand";
import {persist} from "zustand/middleware";

export enum RideType {
    Drop  ,
    Share,
}

export enum VehicleType {
    Tricycle,
    Cab
}

type UpdateRideParam = {
    startStopId?: string;
    endStopId?: string;
    rideType?: RideType;
    vehincleType?: VehicleType;
}
export type Ride = {
    startStopId: string,
    endStopId: string,
    rideType: RideType | null,
    vehincleType: VehicleType | null,
    riderId: string
}

export type RideState = {
    ride: Ride,
    setRide: (
        riderId: string
    ) => void,
    updateRide: (
        {
            startStopId,
            endStopId,
            rideType,
            vehincleType
        }: UpdateRideParam
    ) => void,
    clearRide: () => void
}


export const useRideStore = create(
    persist<RideState>(
        ((set) => ({
            ride: {
                startStopId: "",
                endStopId: "",
                rideType: null,
                vehincleType: null,
                riderId: ""
            },
            setRide: (
                riderId: string
            )=> {
                return set(state => {
                    return {
                        ...state,
                        ride: {
                            ...state.ride,
                            riderId,
                        }
                    }
                })
            },
            updateRide: (
                arg : UpdateRideParam
            ) => {
                return set( state => {
                    return {
                        ...state,
                        ride: {
                            ...state.ride,
                            ...arg
                        }
                    }
                })
            },
            clearRide: () => {
                return set(state => {
                    return {
                        ...state, 
                        ride: {
                            startStopId: "",
                            endStopId: "",
                            rideType: null,
                            vehincleType: null,
                            riderId: ""
                        }
                    }
                })
            }
        })),{
            name: "cthub-ride"
        }
    )
) 