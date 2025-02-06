import AsyncStorage from '@react-native-async-storage/async-storage'
import {UserState} from "@/store/userStore";


export async function getSaveToken(): Promise<UserState|null> {
    const val = await AsyncStorage.getItem("cthub-user");
    if (val != null) return  JSON.parse(val);
    else return null;
}