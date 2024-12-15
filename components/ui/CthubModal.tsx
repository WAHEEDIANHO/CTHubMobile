import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import CthubButton from "@/components/ui/CthubButton";
import {View} from "react-native";
import { StyleSheet } from 'react-native'

type CthubModalProp  = {
    title: string;
    desc?: string;
    confirmText?: string;
    cancelText?: string;
    confirmAction?: () => void;
    cancelAction?: () => void
}

export function CthubModal({
                               title, 
                               desc, 
                               cancelText, 
                               confirmText
} : CthubModalProp) {
    return (
        <View style={StyleSheet.absoluteFill} className="justify-center bg-['rgba(0,0,0,0.8)']">
         
            <ThemedView lightColor="#000" darkColor="#fff"
                        className="flex-col w-3/4 rounded-3xl elevation-2xl justify-center items-center mx-auto px-5 py-10" >
                <ThemedText className="text-center" lightColor="#fff" darkColor="#000" type="title">{title}</ThemedText>
                <ThemedText className="text-center my-3" lightColor="#fff" darkColor="#000">{desc}</ThemedText>/
                { confirmText !== undefined &&  <CthubButton title={confirmText}  /> }
                { cancelText !== undefined &&  <CthubButton light title={cancelText}  /> }
            </ThemedView>    
        </View>
        
    );
}

