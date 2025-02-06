import React, {useContext, useEffect, useRef, useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import MapView, {Circle, MapMarker, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import customMapStyle from "@/utils/mapstyle.json";
import * as Location from 'expo-location';
import {UseLocationContext} from "@/context/UseLocationContext";
import { isPointWithinRadius, getDistance } from 'geolib'
import {useRideStore} from "@/store/rideStore";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import {UserRole, useUserStore} from "@/store/userStore";
import {useRouter} from "expo-router";
import {DriverPos} from "@/components/driver/DriverPos";
import {UseQueryResult} from "@tanstack/react-query";
// import Mapbox from '@rnmapbox/maps'

// Mapbox.setAccessToken("pk.eyJ1Ijoid2FoZWVkaWFuaG8iLCJhIjoiY201bW5nbHkyMDI5ODJrcjNycGlxazlwbiJ9.xfyw7IbbWKJl8Y7Ux-Rjuw");
export type Loc = {
    userId: string,
    latitude: number,
    longitude: number
}

type CTHubMapViewProp = {
    driverLocs?: Loc[] | null,
    driverQueueQueryResponse: UseQueryResult
}

export function CtHubMapView({driverLocs}: CTHubMapViewProp) {
    const mapRef = useRef<MapView>();
    const markerRef = useRef<MapMarker>();
    const ride = useRideStore(state => state.ride);
    const {savedUser, updateUserToken, user} = useUserStore(state => state);
    
    const router = useRouter()
    
    
    
    const staticInitialLocation = {
        latitude: 7.441772980748124, 
        longitude: 3.906142210113632,
        latitudeDelta: 0.0021978414882557473,
        longitudeDelta: 0.00119660049676,
    }
    console.log(isPointWithinRadius(staticInitialLocation, {
        latitude: 7.441835880748124,
        longitude: 3.906205510113632
    }, 11))
    const userLocationContext = useContext(UseLocationContext);
    if (!userLocationContext) return;
    
    const {location, setLocation} = userLocationContext;

    function handelRegionChange(region: any) {
        console.log(region)
    }

    useEffect(() => {
        mapRef.current?.animateToRegion(staticInitialLocation);
    });
    
    const logoutHandler = () => {
        savedUser("", "", "", "", "", "");
        updateUserToken("");
        router.push("/login")
    }

    // console.log(location, "location mapview");
    return (
        <ThemedView className="flex-1">

            {
                user?.role == UserRole.Driver ? (
                        <DriverPos />
                ): null
            }

            <TouchableOpacity onPress={logoutHandler} className="absolute top-0 left-0 z-20 m-5 w-14 h-14 flex-col justify-center items-center rounded-full bg-white">
                <SimpleLineIcons className="" name="logout" size={24} color="black"  />
            </TouchableOpacity>
            <MapView 
                style={styles.map} 
                customMapStyle={customMapStyle} 
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                initialRegion={staticInitialLocation}
                region={staticInitialLocation}
                showsUserLocation
                onRegionChangeComplete={handelRegionChange}
                ref={mapRef}
            >
                <Marker
                    // title="something"
                    coordinate={{
                        latitude: staticInitialLocation.latitude,
                        longitude: staticInitialLocation.longitude
                    }} />
                {
                  driverLocs != null ? driverLocs.map(driver => (
                        <Marker coordinate={{
                            latitude: driver.latitude,
                            longitude: driver.longitude
                        }}
                        title={driver.userId} key={driver.userId}
                        />
                    )): null
                }
                {/*<Marker*/}
                {/*    title="custom label"*/}
                {/*    coordinate={{*/}
                {/*        latitude: 7.441835880748124,*/}
                {/*        longitude: 3.906205510113632*/}
                {/*    }} />*/}
                <Circle 
                    center={staticInitialLocation} 
                    radius={30} 
                    strokeColor="#eab308"
                    style={{
                        borderColor: "red"
                    }}
                />
            </MapView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: 'green',
        borderWidth: 10
    },
    labelContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});



