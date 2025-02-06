import React, {useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {View, Text, TextInput, ScrollView, Touchable, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {ThemedText} from "@/components/ThemedText";
import {CthubInput} from "@/components/ui/CthubInput";
import {CthubButton} from "@/components/ui/CthubButton";
import {CthubCheckBox} from "@/components/ui/CthubCheckBox";
import {Link, useRouter} from "expo-router";
import {useUserRegMutation} from "@/hooks/authentication/useUserRegMutation";
import {useUserStore} from "@/store/userStore";


function Signup() {
    const [email, SetEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activityStatus, setActivityStatus] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    
    const useRegisterMutation = useUserRegMutation();
    const router = useRouter();
    const cacheUser = useUserStore(state => state.savedUser)
    
    


    const registerHandler = () => {
        setActivityStatus(true);
        useRegisterMutation.mutate({email, password, firstName, lastName}, {
            onSuccess: (data: any) => {
                const { token, email, firstName, lastName, role } = data || {}
                setActivityStatus(false);
                cacheUser(token, firstName, lastName, email, role);
                router.navigate("/(tabs)");
            },
            onError: (e) => {
                setPassword("");
                SetEmail("");
                setActivityStatus(false);
        }});
    }

    return (
        <ThemedView safe className="flex-col flex-1 px-5">
            <ScrollView className="flex-1">
                <Pressable className="flex-row flex gap-x-3 items-center self-start" onPress={router.back}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                    <Text className="text-2xl">Back</Text>
                </Pressable>

                <ThemedText type="title" className="my-10">Login into your Account</ThemedText>
                <CthubInput label="First Name" placeholder="e.g Waheed" value={firstName} onChangeText={setFirstName} />
                <CthubInput label="Last Name" placeholder="e.g Safiu" value={lastName} onChangeText={setLastName} />
                <CthubInput label="Email Address" placeholder="e.g x@gmail.com" value={email} onChangeText={SetEmail} />
                <CthubInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />

                <CthubButton title="Sign up" onPress={registerHandler} activityStatus={activityStatus} disabled={activityStatus} />
                
                <View className="flex-row gap-x-2 w-screen justify-start">
                    <ThemedText>Already have an account </ThemedText>
                    <Link href="/login" className="text-yellow-300 font-bold">
                        <ThemedText>login</ThemedText>
                    </Link>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

export default Signup;