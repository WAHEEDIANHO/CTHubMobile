import React from 'react';
import {Pressable, Text, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

type ButtomSheetBackDropProp = {
    snapPoint: number;
    hasPrevious: boolean;
    back?: () => void
}

function ButtomSheetBackDrop({snapPoint, hasPrevious, back}: ButtomSheetBackDropProp) {
    return (
        <View className="bg-yellow-500" style={{ height: snapPoint+30 }} >
            {
                hasPrevious ? (
                    <Pressable className="flex-row  flex gap-x-3 items-center self-start px-4" onPress={back}>
                        <Ionicons name="arrow-back-circle-outline" size={30} color="white"  />
                        <Text className="text-white  font-bold">Hello There</Text>
                    </Pressable>
                ): null
            }
        </View>
    );
}
export default ButtomSheetBackDrop;
