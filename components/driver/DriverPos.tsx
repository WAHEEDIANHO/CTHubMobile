import React from 'react';
import {Text, View} from "react-native";
import {UseQueryResult} from "@tanstack/react-query";

export type DriverPosProp = {
    // driverQueueQueryResponse: UseQueryResult;
    queueIdx: number;
}

export function DriverPos({ queueIdx }: DriverPosProp) {
    // const { data, isPending }: any = driverQueueQueryResponse
    // console.log(data,  "here it is")
    
    
    return (
        <View
            className="absolute top-40 right-20 z-20 w-36 h-36 rounded-full bg-white flex-col justify-center items-center">
            <Text className="text-6xl">{queueIdx?.toString()?.padStart(2, "0")}</Text>
        </View>    );
}

// export default DriverPos;