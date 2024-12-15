import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

type CthubCheckBoxProp = {
    label: string;
    lightColor?: string,
    darkColor?: string
}

export default function CthubCheckBox({ label, lightColor, darkColor }: CthubCheckBoxProp) {
    const [isChecked, setChecked] = useState(false);
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    // console.log(useThemeColor({light: "#000", dark: "#fff"}))

    return (
        <View className="flex-row items-center gap-x-2">
            <TouchableOpacity
                className={`border-[${useThemeColor({light: "#000", dark: "#fff"})}]`}
                style={[styles.checkbox, isChecked && styles.checked, { borderColor }]}
                onPress={() => setChecked(!isChecked)}
            >
                <Text>{isChecked ? '✔' : ''}</Text>
            </TouchableOpacity>
            <ThemedText className="font-bold">{label}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        // borderColor: useThemeColor({}, "text"),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#4630EB',
    },
});
