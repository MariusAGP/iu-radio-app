import {Stack} from 'expo-router';
import 'react-native-reanimated';
import "./globals.css"
import {AuthProvider} from "@/contexts/AuthContext";

export default function RootLayout() {

    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {backgroundColor: '#1A202C'},
                }}
            >
                <Stack.Screen name="(tabs)"/>
            </Stack>
        </AuthProvider>
    );
}
