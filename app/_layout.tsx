import {Stack} from 'expo-router';
import 'react-native-reanimated';
import "./globals.css"
import {AuthProvider, useAuth} from "@/contexts/AuthContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import LoadingScreen from "@/components/LoadingScreen";
import LoginScreen from "@/features/auth/screens/LoginScreen";

function RootLayoutNav() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <LoadingScreen />
            </GestureHandlerRootView>
        );
    }

    if (!user) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <LoginScreen />
            </GestureHandlerRootView>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    );
}

export default function RootLayout() {

    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}
