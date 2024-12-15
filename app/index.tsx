import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {CtHubOverlay} from "@/components/ui/CtHubOverlay";
import {Link} from "expo-router";
import {CthubButton} from "@/components/ui/CthubButton";

function Index() {
    return (
        <ThemedView safe className="flex-1 px-5 bg-red-500">
            
            <CtHubOverlay />
            <View className="relative -left-4">
                <Image source={require('@/assets/images/tricycle.png')}  className="w-full border-0" />
            </View>
            <View className="relative z-[60]">
                <Text className="text-5xl mb-3 text-white font-bold">Welcome to</Text>
                <Text className="text-white w-3/4">Greetings! Allow para, the top tricycle
                    booking app, to brighten your day with a
                    smooth and convenient ride.</Text>
                
                <Link href="/login" asChild>
                    <CthubButton title="Proceed"  />
                </Link>
            </View>
            
        </ThemedView>
    );
}

export default Index;