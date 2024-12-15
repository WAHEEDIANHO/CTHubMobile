import React, {useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {View, Text, TextInput} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {ThemedText} from "@/components/ThemedText";
import {CthubInput} from "@/components/ui/CthubInput";
import CthubButton from "@/components/ui/CthubButton";
import CthubCheckBox from "@/components/ui/CthubCheckBox";
import {Link} from "expo-router";


function Login() {
    const [email, SetEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleLogin = () => {
        console.log(email, password);
    }
    
    return (
        <ThemedView safe className="flex-col flex-1 px-5">
            
            <View className="flex-row gap-x-3 items-center w-full">
                <Ionicons name="arrow-back" size={28} color="black" />
                <Text className="text-2xl">Back</Text>
            </View>
            
            <ThemedText type="title" className="my-10">Login into your Account</ThemedText>
            <CthubInput 
                label="Email Address" 
                placeholder="e.g x@gmail.com" value={email} 
                onChangeText={SetEmail} 
                keyboardType="email-address"
            />
            <CthubInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            
            <CthubCheckBox darkColor="#fff" lightColor="#000" label="Remember me" />
            <Link href="/" asChild>
                <CthubButton title="Sign in" onPress={handleLogin} />
            </Link>
            <View className="flex-row gap-x-2 w-screen justify-start">
                <ThemedText>Don't have account?</ThemedText>
                <Link href="/signup" className="text-yellow-300 font-bold">
                    <ThemedText>Sign up</ThemedText>
                </Link>
            </View>
        </ThemedView>
    );
}

export default Login;