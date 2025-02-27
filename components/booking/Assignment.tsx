import React, {useEffect, useRef} from 'react';
import {CTHubBottomSheet} from "@/components/CTHubBottomSheet";
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from "@gorhom/bottom-sheet";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {CthubButton} from "@/components/ui/CthubButton";
import {useRideStore, VehicleType} from "@/store/rideStore";
import {SheetStatusProps} from "@/app/(tabs)/(user)";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useScheduleQuery} from "@/hooks/ride/useScheduleQuery";
import {useStopsQuery} from "@/hooks/stops/useStopsQuery";
import {useGetUserSchedule} from "@/hooks/schedule/useGetUserSchedule";
import SignalRConn from "@/utils/real-time/signalRConn";
import {HubConnection} from "@microsoft/signalr";
import {Loc} from "@/components/CTHubMapView";
import {useRouter} from "expo-router";


type AssignmentTypeProps = {
    // bottomSheetRef:  React.RefObject<BottomSheetMethods>
    activeSheet: SheetStatusProps;
    setActiveSheet: React.Dispatch<React.SetStateAction<SheetStatusProps>>;
    conn: HubConnection | undefined
}

export function Assignment({setActiveSheet, activeSheet, conn }: AssignmentTypeProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const clearRide = useRideStore(state => state.clearRide);
    const ride = useRideStore(state => state.ride);
    
    const { isPending, isError, data, error, isSuccess } = useGetUserSchedule(
        {
            riderId: ride.riderId,
            vehicleType: ride.vehincleType!
        });
    
    // const router = useRouter();

    // useEffect(() => {
        // data?.forEach((item: any) => (
        //     conn?.invoke("RideWaiter", `${ride.vehincleType == VehicleType.Tricycle ? "TRICYCLE" : "Car"}_${item.route}`, item.riderId)
        // ))
        // console.log(conn?.state, conn?.connectionId)
        // conn?.on("EmitJoiningSchedule", (text: string) => {
        //     console.log("walohi have join Assignment" + text)
        // })
        //
        // conn?.on("EmitRideSchedule", (data: any) => {
        //     console.log(`Ride Schedule: ${data}`);
        //     router.navigate("/congratulation")
        // });
    // }, [data]);

    if (isPending) return <Text>Loading...</Text>
    // if (isError) console.log(error) 
    if (isError) return <Text>"Error occured</Text>
    
    console.log(data)
    
    // const router = useRouter();
    

    function handleRideCancelation() {
        clearRide();
        //cancel the requesu as well later
        setActiveSheet({...activeSheet, assignment: false, whereTo: true})
    } 
    
    return (
        <CTHubBottomSheet hasPrevious={false} bottomSheetRef={bottomSheetRef} componetSnapPoint={[400]}>
            <BottomSheetView className="flex-1">
                <Text className="font-bold text-2xl mb-4">Assigment Notice</Text>
                <BottomSheetFlatList
                    scrollEnabled
                     data={data} renderItem={
                    ({item}: {item: any}) => (
                        <View className="flex-row justify-between items-center border-b py-4" style={{
                            justifyContent: "space-between",
                            // paddingBottom: 60
                        }}>
                            <View className="flex-row w-2/3">
                                <Text>{item?.route}</Text>
                                {/*<Text> Stop</Text>*/}
                            </View>

                            <View className="flex flex-row items-center gap-3 bg-gray-200 px-5 py-2 rounded-3xl" style={{alignSelf: "flex-end"}}>
                                {/*<MaterialCommunityIcons name="rickshaw" size={30} color="black" />*/}
                                <MaterialCommunityIcons name={`${item.vehicle == "CAR" ? "car-side" : "rickshaw"}`} size={30} color="black" />
                                <Text className="font-bold text-2xl">{item?.riders.length}</Text>
                            </View>
                        </View>
                    )
                } />
                

                <CthubButton title="Cancel Ride"
                     onPress={handleRideCancelation}
                />
            </BottomSheetView>
        </CTHubBottomSheet>
    );
}

