import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {View, Text, TextInput} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {ThemedText} from "@/components/ThemedText";
import {CthubInput} from "@/components/ui/CthubInput";
import CthubButton from "@/components/ui/CthubButton";
import CthubCheckBox from "@/components/ui/CthubCheckBox";
import {Link} from "expo-router";


function Signup() {
    return (
        <ThemedView safe className="flex-col flex-1 border-2 border-red-700 px-5">

            <View className="flex-row gap-x-3 items-center w-full">
                <Ionicons name="arrow-back" size={28} color="black" />
                <Text className="text-2xl">Back</Text>
            </View>

            <ThemedText type="title" className="my-10">Login into your Account</ThemedText>
            <CthubInput label="Name" placeholder="e.g Safiu Waheed" />
            <CthubInput label="Email Address" placeholder="e.g x@gmail.com" />
            <CthubInput label="Password" />

            <CthubCheckBox label="Remember me" />
            <CthubButton title="Sign up" />
            <View className="flex-row gap-x-2 w-screen justify-start">
                <ThemedText>Already have an account </ThemedText>
                <Link href="/login" className="text-yellow-300 font-bold">
                    <ThemedText>login</ThemedText>
                </Link>
            </View>
        </ThemedView>
    );
}

export default Signup;