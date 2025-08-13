import {Redirect} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function Index() {
    return (
        <GestureHandlerRootView>
            <Redirect href="/(tabs)"/>
        </GestureHandlerRootView>
    );
}
