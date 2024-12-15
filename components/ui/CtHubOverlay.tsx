import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, Text, View} from "react-native";

export function CtHubOverlay() {
    return (
        <View style={StyleSheet.absoluteFill} 
                    className="bg-['rgba(0,0,0,0.85)'] z-20">
        </View>
    );
}

