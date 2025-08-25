import {Redirect} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function Index() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Redirect href="/(tabs)" />
        </GestureHandlerRootView>
    );
}
