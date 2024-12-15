import React from 'react';
import {Pressable, PressableProps, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";


type Prop = TouchableOpacityProps & {
    title: string;
    light?: boolean
}


function CthubButton({title, light, ...args}: Prop) {
    return (
                light ?
                    <TouchableOpacity
                        {...args}
                        className={`text-center bg-amber-100 p-5 rounded-3xl my-5 w-full`}
                    >
                        <ThemedText lightColor="#000" darkColor="#000"  type="defaultSemiBold" className="text-center">{title}</ThemedText>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        {...args}
                        className={`text-center bg-amber-600 p-5 rounded-3xl my-5 w-full`}
                    >
                        <ThemedText lightColor="#000" type="defaultSemiBold" className="text-center">{title}</ThemedText>
                    </TouchableOpacity>
    );
}

export default CthubButton;