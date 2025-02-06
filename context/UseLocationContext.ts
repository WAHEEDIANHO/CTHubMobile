import {createContext} from "react";
import {LocationObject} from "expo-location";

export const UseLocationContext = 
    createContext<{ location: LocationObject; setLocation: React.Dispatch<React.SetStateAction<LocationObject>> } | null>(null);