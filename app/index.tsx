import React, {useEffect, useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {CtHubOverlay} from "@/components/ui/CtHubOverlay";
import {Link} from "expo-router";
import {CthubButton} from "@/components/ui/CthubButton";
import * as Location from "expo-location";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import SignalRConn from "@/utils/real-time/signalRConn";
// import {getDevicePushTokenAsync} from 'expo-notifications'
function Index() {

    useEffect(() => {
        (async _ => {
            // const token = (await getDevicePushTokenAsync()).data;
            // console.log(token, "this is token")
        })()
    }, []);


    return (
        <ThemedView safe className="flex-1">
            <ImageBackground  resizeMode="contain" className="flex-1 object-fit justify-end" source={require('@/assets/images/tricycle.png')}>
                <CtHubOverlay />
                {/*<View className="relative -left-4">*/}
                {/*    <Image source={require('@/assets/images/tricycle.png')}  className="w-full border-0" />*/}
                {/*</View>*/}
                <View className="relative z-[60] p-5">
                    <Text className="text-5xl text-white font-bold">Welcome to</Text>
                    <Image 
                        source={require('@/assets/images/cthub.png')} 
                        width={100} height={43} 
                        alt="Cthub" className="w-1/3 my-2"
                    />
                    <Text className="text-white w-3/4">Greetings! Allow CTHub, the top 
                        booking app, to brighten your day with a
                        smooth and convenient ride on campus.</Text>

                    <Link href="/login" asChild>
                        <CthubButton title="Proceed" className="mb-3"  />
                    </Link>
                </View>    
            </ImageBackground>
        </ThemedView>
    );
}

export default Index;