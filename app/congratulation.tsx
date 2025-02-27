import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Image, Text} from "react-native";
import {CthubButton} from "@/components/ui/CthubButton";
import {useLocalSearchParams, useRouter} from "expo-router";

function Congratulation() {
    const {data} = useLocalSearchParams();
    
    const router = useRouter();
    
    return (
        <ThemedView safe className="flex-col flex-1 px-5 items-center justify-center">
            <Image
                source={require('@/assets/images/cong.png')}
                width={80} height={105}
                alt="Cthub" className=" my-2"
            />
            <ThemedText className="font-bold !text-4xl">Congratulations</ThemedText>
            <ThemedText className="text-center mt-5 font-light">You have been put with driver on </ThemedText>
            <ThemedText>{data} route</ThemedText>
            <CthubButton title ="Book a Ride" onPress={() => router.navigate("/(tabs)/(user)") } />
        </ThemedView>
    );
}

export default Congratulation;