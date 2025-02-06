import React, {useRef} from 'react';
import {CTHubBottomSheet} from "@/components/CTHubBottomSheet";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {SheetStatusProps} from "@/app/(tabs)/(user)";
import {useRideStore, VehicleType} from "@/store/rideStore";

type VehincleTypeProps = {
    // bottomSheetRef:  React.RefObject<BottomSheetMethods>
    activeSheet: SheetStatusProps;
    setActiveSheet: React.Dispatch<React.SetStateAction<SheetStatusProps>>;
}


function VehincleTypeLayout({activeSheet, setActiveSheet}: VehincleTypeProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    // const [vehincleTYpe, setVehincleType] = useState()
    const {updateRide, ride} = useRideStore(state => state)

    function handleSelection(vehincleType: VehicleType) {
        console.log(ride)
        updateRide({vehincleType: vehincleType})
        setActiveSheet({...activeSheet, vehincleType: false, bookingSummary: true});
    }

    const backHandler = () => setActiveSheet({...activeSheet, vehincleType: false, rideType: true})

    return (
        <CTHubBottomSheet hasPrevious back={backHandler} bottomSheetRef={bottomSheetRef} componetSnapPoint={[200, 300]}>
            <BottomSheetScrollView className="flex-1">
                <TouchableOpacity className="flex-row border p-5 rounded-3xl mb-5"
                                  onPress={() => handleSelection(VehicleType.Cab)}
                >
                    <View className="w-1/3">
                        <ImageBackground resizeMode="contain" className="flex-1 object-fit justify-end" source={require("@/assets/images/car.png")} />
                    </View>
                    <View className="flex-col gap-3">
                        <Text className="text-2xl font-bold">Car</Text>
                        <View className="flex-row gap-3 items-center">
                            <MaterialCommunityIcons name="account" size={24} color="black" />
                            <Text>4</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row border p-5 rounded-3xl"
                  onPress={() => handleSelection(VehicleType.Tricycle)}
                >
                    <View className="w-1/3 object-contain">
                        <ImageBackground  resizeMode="contain" className="flex-1 object-fit justify-end" source={require('@/assets/images/tricycle_.png')} />
                    </View>
                    <View className="flex-col gap-3">
                        <Text className="text-2xl font-bold">Tricycle</Text>
                        <View className="flex-row gap-3 items-center">
                            <MaterialCommunityIcons name="account" size={24} color="black" />
                            <Text>3</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </BottomSheetScrollView>
        </CTHubBottomSheet>
    );
}

export default VehincleTypeLayout;