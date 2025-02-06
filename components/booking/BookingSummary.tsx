import React, {useRef, useState} from 'react';
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import {CTHubBottomSheet} from "@/components/CTHubBottomSheet";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {CthubButton} from "@/components/ui/CthubButton";
import {UserRole, useUserStore} from "@/store/userStore";
import {SheetStatusProps} from "@/app/(tabs)/(user)";
import {RideType, useRideStore, VehicleType} from "@/store/rideStore";
import {useBookRideMutation} from "@/hooks/ride/useBookRideMutation";
import {HubConnection} from "@microsoft/signalr";

type BookingSummaryTypeProps = {
    // bottomSheetRef:  React.RefObject<BottomSheetMethods>
    activeSheet: SheetStatusProps;
    setActiveSheet: React.Dispatch<React.SetStateAction<SheetStatusProps>>;
    // conn: HubConnection | undefined
}

function BookingSummary({activeSheet, setActiveSheet}: BookingSummaryTypeProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const user = useUserStore(state => state.user);
    const { ride } = useRideStore(state => state);
    const [activityStatus, setActivityStatus] = useState<boolean>(false);
    const bookRideMutation = useBookRideMutation()


    function hadleComfimation() {
        setActivityStatus(true)
        // setRide(user.id)
        console.log(ride);
        bookRideMutation.mutate(ride, {
            onSuccess: (data: any) => {
                console.log(data)
                setActivityStatus(false);
                setActiveSheet({...activeSheet, bookingSummary: false, assignment: true})
            },
            onError: (e) => {
                console.log("error reaching server")
                setActivityStatus(false);
            }
        })
        // console.log(conn)
        // conn?.invoke("RideWaiter", `route`, "riderId")
    }
    
    const arrangement: any = {
        Drop_Tricycle: 2,
        Drop_Cab: 3,
        Share_Tricycle: 3,
        Share_Cab: 4
    }

    const backHandler = () => setActiveSheet({...activeSheet, vehincleType: true, bookingSummary: false})

    return (
        <CTHubBottomSheet hasPrevious back={backHandler} bottomSheetRef={bottomSheetRef} componetSnapPoint={[300, 350]}>
            <BottomSheetView className="flex-1">
                
                <View className="flex-col border border-yellow-500 p-5 rounded-3xl w-full mb-5 relative">
                    <View className="bg-yellow-500 rounded-3xl px-5 absolute" style={styles.badge}>
                        <Text className="text-white">{Object.values(RideType)[ride.rideType!]}</Text>
                    </View>
                    <View className="flex-row">
                        <View className="w-1/3">
                            {
                                ride.vehincleType == VehicleType.Cab ?
                                    (
                                        <ImageBackground
                                            resizeMode="contain"
                                            className="flex-1 object-fit justify-end"
                                            source={require(`@/assets/images/car.png`)}
                                        />
                                    ):
                                    (
                                        <ImageBackground
                                            resizeMode="contain"
                                            className="flex-1 object-fit justify-end"
                                            source={require(`@/assets/images/tricycle_.png`)}
                                        />
                                    )
                            }
                        </View>
                        <View className="flex-col gap-3">
                            <Text className="text-2xl font-bold">{
                                Object.values(VehicleType)[ride.vehincleType!]
                            }</Text>
                            <View className="flex-row gap-3 items-center">
                                <MaterialCommunityIcons name="account" size={24} color="black" />
                                <Text>max - { arrangement[`${Object.values(RideType)[ride.rideType!]}_${Object.values(VehicleType)[ride.vehincleType!]}`] }</Text>
                                {/*<Text>{`${Object.values(RideType)[ride.rideType!]}_${Object.values(VehicleType)[ride.vehincleType!]}`}</Text>*/}
                            </View>
                        </View>
                    </View>
                </View>
                <CthubButton activityStatus={activityStatus} disabled={activityStatus} title="Confirm CTHub"
                     onPress={hadleComfimation}
                />
            </BottomSheetView>
        </CTHubBottomSheet>
    );
}

const styles = StyleSheet.create({
    badge: {
        left: "50%",
        transform: [{translateX: "-50%"}, {translateY: "-50%"}],
        alignSelf: "flex-start", 
        padding: 5
    }
})

export default BookingSummary;