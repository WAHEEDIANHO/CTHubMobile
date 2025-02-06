import { create } from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    role: string;
    firstname: string;
    lastname: string;
    email: string;
    id: string;
}

export enum UserRole {
    Driver = "Driver",
    Rider = "Rider"     
}

export type UserState = {
    token: string;
    user:User
    savedUser: (token: string,  firstname: string, lastname: string, email: string, role: string, id: string) => void; 
    updateUserToken: (token: string) => void;
}

export const useUserStore = create(
    persist<UserState> (
        ((set) => ({
            token: "",
            user: {
                lastname: "",
                firstname: "",
                email: "",
                role: "",
                id: ""
            },
            savedUser: (token: string,  firstname: string, lastname: string, email: string, role: string, id: string) => {
                return set(state => {
                    return {
                        ...state,
                        token,
                        user: {
                            email,
                            firstname,
                            lastname,
                            role,
                            id
                        }
                    }
                })
            },
            updateUserToken: (token: string) => {
                return set(state => {
                    return {
                        ...state,
                        token
                    }
                } )
            }
        })), {
            name: "cthub-user",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)