import React, {useContext, useEffect, useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {CtHubMapView, Loc} from "@/components/CTHubMapView";
import {Driver} from "@/components/Driver";
import SignalRConn from "@/utils/real-time/signalRConn";
import {HubConnection} from "@microsoft/signalr";
import {useUserStore} from "@/store/userStore";
import {state} from "sucrase/dist/types/parser/traverser/base";
import {UseLocationContext} from "@/context/UseLocationContext";
import {useGetDriverQueueQuery} from "@/hooks/driver/useGetDriverQueueQuery";

function DriverScreen() {
    const [driverLocs, setDriverLocs] = useState<Loc[]>();
    const [signalConn, setSignalConn] = useState<HubConnection>();
    const user = useUserStore(state => state.user);

    useEffect(() => {
        (async function () {    
            if (!SignalRConn.getConnection()) await SignalRConn.init(user.id);
            const conn: HubConnection = SignalRConn.getConnection()!;
            setSignalConn(conn);
            conn?.invoke("SendLocation", {
                userId: "123456",
                latitude: 7.441835880748124,
                longitude: 3.906205510113632
            });
            
            conn.on("DriverLocations", (driverLocs: Loc[]) => {
                console.log(driverLocs, "driver received");
                setDriverLocs(driverLocs);
            })
            
            // conn.onclose(() => {
            //     console.log("connection lost, attempting reconnect")
            //     SignalRConn.getConnection()?.start()
            // })
        })()
    }, []);
    
    const driverQueueQueryResponse = useGetDriverQueueQuery({driverId: "wertyufxgc"})
    
    
    return (
        <ThemedView safe className="flex-1">
            <GestureHandlerRootView>
                <CtHubMapView driverLocs={driverLocs} driverQueueQueryResponse={driverQueueQueryResponse} />
                <Driver signalConn={signalConn!} driverQueueQueryResponse={driverQueueQueryResponse} />
            </GestureHandlerRootView>
        </ThemedView>
    );
}

export default DriverScreen;