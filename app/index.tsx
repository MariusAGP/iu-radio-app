import {Redirect} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useAuth} from "@/contexts/AuthContext";
import LoginScreen from "@/features/auth/screens/LoginScreen";
import LoadingScreen from "@/components/LoadingScreen";

export default function Index() {
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
            <Redirect href="/(tabs)" />
        </GestureHandlerRootView>
    );
}
