import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {ThemedView} from "@/components/ThemedView";
import {useRouter} from "expo-router";
import {useStopsQuery} from "@/hooks/stops/useStopsQuery";

const tricycles = [
    { id: "L319RS", name: "Bruce", vacancy: "1 Vacant - 40 m away", price: 22.0 },
    { id: "L214RM", name: "Tony", vacancy: "1 Vacant - 33 m away", price: 16.0 },
    { id: "L112ED", name: "Steve", vacancy: "3 Vacant - 28 m away", price: 16.0 },
    { id: "L911BF", name: "Peter", vacancy: "Full", price: 16.0 },
];

const TricycleSelection = () => {
    const [selected, setSelected] = useState(null);
    const navigation = useRouter();

    const { isPending, isError, data, error } = useStopsQuery();

    if (isPending) return <ThemedView safe ><Text>Loading...</Text></ThemedView>
    if (isError) return <ThemedView><Text>"Error occured</Text></ThemedView>

    return (
        <ThemedView safe className="flex-1 bg-white">
            <View className="bg-yellow-500 p-4 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold ml-4">History</Text>
            </View>
            

            <ScrollView className="px-4 mt-4">
                {tricycles.map((tricycle) => (
                    <TouchableOpacity
                        key={tricycle.id}
                        className={`flex-row items-center bg-gray-100 p-4 mb-2 rounded-lg ${
                            selected === tricycle.id ? "border-2 border-yellow-500" : ""
                        }`}
                        onPress={() => setSelected(tricycle.id)}
                    >
                        <MaterialCommunityIcons
                            name="bike"
                            size={40}
                            color="black"
                            className="mr-4"
                        />
                        <View className="flex-1">
                            <Text className="font-semibold">
                                {tricycle.id} - {tricycle.name}
                            </Text>
                            <Text className="text-gray-500 text-sm">{tricycle.vacancy}</Text>
                        </View>
                        {/*<Text className="text-gray-700 font-semibold">*/}
                        {/*    ₱ {tricycle.price.toFixed(2)}*/}
                        {/*</Text>*/}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/*<TouchableOpacity className="bg-yellow-500 mx-4 my-4 p-4 rounded-lg">*/}
            {/*    <Text className="text-center font-semibold text-white">Continue</Text>*/}
            {/*</TouchableOpacity>*/}
        </ThemedView>
    );
};

export default TricycleSelection;
