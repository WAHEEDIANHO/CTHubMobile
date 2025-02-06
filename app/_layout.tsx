import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import "@/global.css"
import {ToastProvider} from "react-native-toast-notifications";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {UseLocationContext} from "@/context/UseLocationContext";
import * as Location from "expo-location";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  console.log(location, "location");


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  const queryClient = new QueryClient()

  return (
    <UseLocationContext.Provider value={{location, setLocation}}>
    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
    <ToastProvider>  
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="index" options={{ headerShown: false  }} />
          <Stack.Screen name="login" options={{ headerShown: false  }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="congratulation" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
       
      </ThemeProvider>
    </ToastProvider>
    </SafeAreaProvider>
    </QueryClientProvider>
    </UseLocationContext.Provider>
  );
}
