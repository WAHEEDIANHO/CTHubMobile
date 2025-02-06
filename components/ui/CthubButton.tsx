import React from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    TouchableOpacityProps,
    View
} from "react-native";
import {ThemedText} from "@/components/ThemedText";


type Prop = TouchableOpacityProps & {
    title: string;
    light?: boolean,
    activityStatus?: boolean
}


export function CthubButton({title, light, activityStatus=false, ...args}: Prop) {
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
                        className={`text-center flex-col items-center bg-yellow-500 p-5 rounded-3xl my-5 w-full`}
                    >
                        <View className="flex-row">
                            { activityStatus && <ActivityIndicator/>}
                            <ThemedText lightColor="#000" type="defaultSemiBold" className="ms-2">{title}</ThemedText>
                        </View>
                    </TouchableOpacity>
    );
}

// export default CthubButton;