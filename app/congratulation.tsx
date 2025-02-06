import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Image, Text} from "react-native";
import {CthubButton} from "@/components/ui/CthubButton";
import {useLocalSearchParams, useRouter} from "expo-router";

function Congratulation() {
    const {data} = useLocalSearchParams();
    
    return (
        <ThemedView safe className="flex-col flex-1 px-5 items-center justify-center">
            <Image
                source={require('@/assets/images/cong.png')}
                width={80} height={105}
                alt="Cthub" className=" my-2"
            />
            <ThemedText className="font-bold !text-4xl">Congratulations</ThemedText>
            <ThemedText className="text-center mt-5 font-light">Your information has been verified. You are now eligible to share a ride.</ThemedText>
            <Text>{data.toString()}</Text>
            <CthubButton title ="Book a Ride" />
        </ThemedView>
    );
}

export default Congratulation;