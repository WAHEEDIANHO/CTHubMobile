import React, {useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {View, Text, TextInput, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {ThemedText} from "@/components/ThemedText";
import {CthubInput} from "@/components/ui/CthubInput";
import {CthubButton} from "@/components/ui/CthubButton";
import {CthubCheckBox} from "@/components/ui/CthubCheckBox";
import {Link, useRouter} from "expo-router";
import {UserRole, useUserStore} from "@/store/userStore";
import {useUserLoginMutation} from "@/hooks/authentication/useUserLoginMutation";
import {UseMutationResult} from "@tanstack/react-query";
import {axiosInstance} from "@/utils/axiosInstance";
import axios from "axios";


// type MutateType = {
//     isError: boolean, 
//     isSuccess: boolean,
//     isPending: boolean
// }

function Login() {
    const [email, SetEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activityStatus, setActivityStatus] = useState<boolean>(false);
    
    const user = useUserStore(state => state.user);
    // console.log(user);
    const cacheUser = useUserStore(state => state.savedUser)
    const userLoginMutation = useUserLoginMutation();
    
    const router = useRouter();
    
    const handleLogin = async () => {
        setActivityStatus(true);
        userLoginMutation.mutate({email, password}, {
            onSuccess: (data: any) => {
                console.log(data)
                const { token, email, firstName, lastName, role, id } = data || {}
                setActivityStatus(false);
                cacheUser(token, firstName, lastName, email, role, id);
                console.log(role,  "is here")
                role == UserRole.Rider ? router.navigate("/(tabs)/(user)") : router.navigate("/(tabs)/(user)/driver");
            },
            onError: (e) => {
                console.log("error reaching server")
                SetEmail("");
                setPassword("");
                setActivityStatus(false);
                router.navigate("/(tabs)/(user)");
            }});
        //
        // console.log(resp)
        // console.log(email, password);
        // setTimeout(() => {
        //     setActivityStatus(false);
        //     router.navigate("/");
        // }, 3000);
        
    }
    
    return (
        <ThemedView safe className="flex-col flex-1 px-5">

            <Pressable className="flex-row flex gap-x-3 items-center self-start" onPress={router.back}>
                <Ionicons name="arrow-back" size={28} color="black" />
                <Text className="text-2xl">Back</Text>
            </Pressable>
            
            <ThemedText type="title" className="my-10">Login into your Account</ThemedText>
            <CthubInput 
                label="Email Address" 
                placeholder="e.g x@gmail.com" value={email} 
                onChangeText={SetEmail} 
                keyboardType="email-address"
            />
            <CthubInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            
            <CthubCheckBox darkColor="#fff" lightColor="#000" label="Remember me" />
            <CthubButton title="Sign in" onPress={handleLogin} activityStatus={activityStatus} disabled={activityStatus} />
            <View className="flex-row gap-x-2 w-screen justify-start">
                <ThemedText>Don't have account?</ThemedText>
                <Link href="/congratulation" className="text-yellow-300 font-bold">
                    <ThemedText>Sign up</ThemedText>
                </Link>
            </View>
        </ThemedView>
    );
}

export default Login;