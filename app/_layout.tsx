import { loadAsync } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import "@/globals.css";
import { useSetAtom } from "jotai";
import { emailAtom, sessionAtom } from "@/lib/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_TOKEN_NAME } from "@/lib/constants";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const setSession = useSetAtom(sessionAtom);
  const setEmail = useSetAtom(emailAtom);

  useEffect(() => {
    (async () => {
      //We could also store and get this in Expo SecureStore
      const token = await AsyncStorage.getItem(SESSION_TOKEN_NAME);

      if (token) {
        //This is a simple CRUD API, so we just get the user data by the token which is a numerical id
        const res = await fetch(
          `https://66bca4db24da2de7ff6b5a05.mockapi.io/auth/${token}`,
          {
            headers: { "Content-Type": "application/json" },
            method: "GET",
          }
        );

        if (res.ok) {
          const data = await res.json();

          setSession(token);
          setEmail(data.email);
        }
      }
    })().finally(() => {
      loadAsync({
        // Load some fonts if needed
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
      }).finally(() => {
        SplashScreen.hideAsync();
      });
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
