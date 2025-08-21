import {ActivityIndicator, View, Text} from "react-native";

export default function LoadingScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <View className="items-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="mt-4 text-base text-gray-600 font-medium">
                    Loading...
                </Text>
            </View>
        </View>
    );
}