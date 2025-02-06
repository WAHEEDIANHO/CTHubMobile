import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {CtHubMapView} from "@/components/CTHubMapView";
import WhereTo from "@/components/booking/WhereTo";
import {RideTypeLayout} from "@/components/booking/RideTypeLayout";
import VehincleTypeLayout from "@/components/booking/VehincleTypeLayout";
import BookingSummary from "@/components/booking/BookingSummary";
import {Assignment} from "@/components/booking/Assignment";

function Index() {
    return (
        <ThemedView safe className="flex-1">
            <GestureHandlerRootView>
                <CtHubMapView driverLocs={null}/>
                <Assignment  />
            </GestureHandlerRootView>
        </ThemedView>
    );
}

export default Index;