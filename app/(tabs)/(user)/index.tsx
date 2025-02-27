import React, {useEffect, useRef, useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {CtHubMapView, Loc} from "@/components/CTHubMapView";
import {Driver} from "@/components/Driver";
import BottomSheet from "@gorhom/bottom-sheet";
import WhereTo from "@/components/booking/WhereTo";
import {RideTypeLayout} from "@/components/booking/RideTypeLayout";
import VehincleTypeLayout from "@/components/booking/VehincleTypeLayout";
import BookingSummary from "@/components/booking/BookingSummary";
import {Assignment} from "@/components/booking/Assignment";
import SignalRConn from "@/utils/real-time/signalRConn";
import {HubConnection} from "@microsoft/signalr";
import {useUserStore} from "@/store/userStore";
import {useRouter} from "expo-router";

export type SheetStatusProps = {
        whereTo: boolean;
        rideType: boolean,
        vehincleType: boolean,
        bookingSummary: boolean,
        assignment: boolean
}


function Index() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [driverLocs, setDriverLocs] = useState<Loc[]>();
    const [hubConnection, setHubConnection] = useState<HubConnection | undefined>();
    const user = useUserStore(state => state.user)
    const router = useRouter();
    

    if (!user) router.navigate("/login")
    useEffect(() => {
        (async function () {
            if (!SignalRConn.getConnection()) await SignalRConn.init(user.id);
            const conn: HubConnection = SignalRConn.getConnection()!;
            setHubConnection(conn)
            
            // conn.on("EmitJoiningSchedule", (text: string) => {
            //     console.log("walohi have join")
            // })

            conn.on("ReceiveMessage", (text: string) => {
                console.log(text, "rider received loc");
                // setDriverLocs(/);
            })
            
            conn.on("DriverLocations", (driverLocs: Loc[]) => {
                console.log(driverLocs, "rider received loc");
                setDriverLocs(driverLocs);
            })
            
            conn.on("EmitRideSchedule", (data: any) => {
                console.log(`Ride Schedule: ${data}`);
                router.navigate(`/congratulation?data=${data}`)
            });
            
            return () => {
                conn.stop();
                console.log("Connection stopped");
            }
        })()
    }, []);
   

    const [activeSheet, setActiveSheet] = useState<SheetStatusProps>({
        whereTo: true,
        rideType: false,
        vehincleType: false,
        bookingSummary: false,
        assignment: false
    })
    
    return (
        <ThemedView safe className="flex-1">
            <GestureHandlerRootView>
                <CtHubMapView driverLocs={driverLocs}/>
                {activeSheet.whereTo && <WhereTo activeSheet={activeSheet} setActiveSheet={setActiveSheet} />}
                { activeSheet.rideType && <RideTypeLayout activeSheet={activeSheet} setActiveSheet={setActiveSheet} />}
                {activeSheet.vehincleType && <VehincleTypeLayout activeSheet={activeSheet} setActiveSheet={setActiveSheet} />}
                {activeSheet.bookingSummary && <BookingSummary  activeSheet={activeSheet} setActiveSheet={setActiveSheet} />}
                {activeSheet.assignment && <Assignment conn={hubConnection}  activeSheet={activeSheet} setActiveSheet={setActiveSheet} />}
            </GestureHandlerRootView>
        </ThemedView>
    );
}

export default Index;