import React from 'react';
import {TextInput, TextInputProps} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

type CthubInputProp = TextInputProps & {
    label: string;
    lightColor?: string;
    darkColor?: string;
}

export function CthubInput({ label, lightColor="#000000", darkColor="#ffffff", ...arg}: CthubInputProp) {
    const color = useThemeColor({ light: lightColor, dark: darkColor });
    
    return (
            <ThemedView className="my-5">
                <ThemedText className="mb-3 " type="subtitle">{label}</ThemedText>
                <TextInput style={{ color }} className={`placeholder:text-['#0000009f'] dark:placeholder:text-['#ffffff9f'] border rounded-3xl py-5 border-amber-600 px-5`} {...arg} />
            </ThemedView>
    );
}

