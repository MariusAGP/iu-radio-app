import {Stack} from 'expo-router';
import 'react-native-reanimated';
import "./globals.css"

export default function RootLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: '#1A202C'},
            }}
        >
            <Stack.Screen name="(tabs)"/>
        </Stack>
    );
}
