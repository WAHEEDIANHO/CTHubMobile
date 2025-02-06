import React, {useRef, useState} from 'react';
import {CTHubBottomSheet} from "@/components/CTHubBottomSheet";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {Text, View} from "react-native";
import {ItemList} from "@/components/ItemList";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import {SheetStatusProps} from "@/app/(tabs)";
import {RideType, useRideStore} from "@/store/rideStore";
import {SheetStatusProps} from "@/app/(tabs)/(user)";

type RideTypeProps = {
    // bottomSheetRef:  React.RefObject<BottomSheetMethods>
    activeSheet: SheetStatusProps;
    setActiveSheet: React.Dispatch<React.SetStateAction<SheetStatusProps>>;
}

export function RideTypeLayout({activeSheet, setActiveSheet}: RideTypeProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [rideType, setrideType] = useState()
    const updateRide = useRideStore(state => state.updateRide);


    function handleRideSelection(rideSelection: RideType) {
        console.log(rideSelection, "the ride selected")
        updateRide({rideType: rideSelection})
        setActiveSheet({...activeSheet, rideType: false, vehincleType: true})
    }
    
    const backHandler = () => setActiveSheet({...activeSheet, rideType: false, whereTo: true})
    
    

    return (
        <CTHubBottomSheet hasPrevious={true} back={backHandler} bottomSheetRef={bottomSheetRef} componetSnapPoint={[200, 300]}>
            <BottomSheetScrollView className="flex-1">
                <ItemList pressHandler={() => handleRideSelection(RideType.Share)}> 
                    <View className="flex-row items-center gap-3">
                        <FontAwesome6 name="people-group" size={32} color="black" />
                        <View>
                            <Text className="text-2xl font-bold">Share Ride</Text>
                            <Text className="text-xs">tricycle - 3 passenger</Text>
                            <Text className="text-xs">Cab - 4 passenger</Text>
                        </View>
                    </View>
                </ItemList>
                <ItemList pressHandler={() => handleRideSelection(RideType.Drop)}>
                    <View className="flex-row items-center gap-3">
                        <FontAwesome name="users" size={24} color="black" />
                        <View>
                            <Text className="text-2xl font-bold">Drop Ride</Text>
                            <Text className="text-xs">tricycle - 2 passenger</Text>
                            <Text className="text-xs">tricycle - 3 passenger</Text>
                        </View>
                    </View>
                </ItemList>
            </BottomSheetScrollView>
        </CTHubBottomSheet>
    );
}

