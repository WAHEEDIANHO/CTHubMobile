import React, {useContext, useEffect, useRef, useState} from 'react';
import {CTHubBottomSheet} from "@/components/CTHubBottomSheet";
import {TextInput, View} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet from "@gorhom/bottom-sheet";
import {CthubButton} from "@/components/ui/CthubButton";
import SignalRConn from "@/utils/real-time/signalRConn";
import {HubConnection} from "@microsoft/signalr";
import {UseLocationContext} from "@/context/UseLocationContext";
import {useUserStore} from "@/store/userStore";
import {useDriverEnqueueMutation} from "@/hooks/driver/useDriverEnqueueMutation";
import {VehicleType} from "@/store/rideStore";
import {UseQueryResult} from "@tanstack/react-query";
type Location = {
    userId: string,
    latitude: number,
    longitude: number
}
type DriverProps = {
    signalConn: HubConnection,
    driverQueueQueryResponse: UseQueryResult
}

export function Driver({ signalConn, driverQueueQueryResponse }: DriverProps) {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [activityStatus, setActivityStatus] = useState<boolean>(false)
    const userLocationContext = useContext(UseLocationContext)!;
    const user = useUserStore(state => state.user);
    // if (!userLocationContext) return;
    // const {location} = userLocationContext;
    const { data } = driverQueueQueryResponse
    console.log(data, "this is the data")
    
    const joinDriverQueueMutation = useDriverEnqueueMutation()


    async function handleQueue() {
        setActivityStatus(true);
        const {location} = userLocationContext;
        joinDriverQueueMutation.mutate({
            driverId: user.id,
            latitude: ""+location?.coords.latitude!,
            longitude: ""+location?.coords.longitude!,
            vehincle: VehicleType.Tricycle
        }, {
            onSuccess: (data: any) => {
                console.log(data)
                setActivityStatus(false);
            },
            onError: (e) => {
                console.log("error reaching server")
                setActivityStatus(false);
            }
        })
        
        
        // signalConn?.invoke("Queue");
    }
    return (
        <CTHubBottomSheet hasPrevious={false} bottomSheetRef={bottomSheetRef} componetSnapPoint={[200]}>
            <CthubButton title="Queue" onPress={handleQueue} activityStatus={activityStatus}  />
        </CTHubBottomSheet>
    );
}

