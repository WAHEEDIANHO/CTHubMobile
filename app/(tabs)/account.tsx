import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ThemedView} from "@/components/ThemedView";

const AccountScreen = () => {
    return (
        <ThemedView safe className="flex-1 bg-white p-6">
            {/* Header */}
            <Text className="text-2xl font-bold mb-8">Account</Text>

            {/* Avatar Section */}
            <View className="items-center mb-8">
                <View className="relative">
                    {/* Real avatar image (randomuser.me) */}
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                        className="w-24 h-24 rounded-full"
                    />

                    {/* Camera Icon */}
                    <TouchableOpacity className="absolute -right-2 -bottom-2 bg-blue-500 p-2 rounded-full">
                        <Ionicons name="camera" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Menu Items */}
            <View className="flex-col gap-6">
                {/* Favourite */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-medium">Favourite</Text>
                    <Ionicons name="eye-off" size={20} color="gray" />
                </View>

                {/* Edit Account */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-medium">Edit Account</Text>
                    <Ionicons name="eye-off" size={20} color="gray" />
                </View>

                {/* Settings and Privacy */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-medium">Settings and Privacy</Text>
                    <Ionicons name="eye-off" size={20} color="gray" />
                </View>

                {/* Help */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-medium">Help</Text>
                    {/* Pink Indicator */}
                    <View className="w-3 h-3 rounded-full bg-pink-500" />
                </View>
            </View>
        </ThemedView>
    );
};

export default AccountScreen;
