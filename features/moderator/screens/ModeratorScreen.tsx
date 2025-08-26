import {Text, View, FlatList} from "react-native";
import {useFeedbackStore} from "@/stores/feedbackStore";
import * as Notifications from "expo-notifications";
import {useEffect, useRef} from "react";

export default function ModeratorScreen() {
    const {feedbacks} = useFeedbackStore();
    const lastFeedbackIdRef = useRef<string | null>(null);

    //Notification Listener & Permissions
    useEffect(() => {
        (async () => {
            const {status} = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Notification permissions not granted!");
            }
        })();
        const notificationListener = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log("Notificaton received:", notification);
            }
        );

        const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("Notification response:", response);
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);
    //Push Notification bei neuem Feedback
    useEffect(() => {
        if (feedbacks.length === 0) return;
        const last = feedbacks[feedbacks.length -1];
        if (last.id !== lastFeedbackIdRef.current) {
            lastFeedbackIdRef.current = last.id;
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Neues Feedback vorhanden!",
                    body: last.text,
                    data: {feedbackId: last.id},
                },
                trigger: null, //sofort anzeigen
            });
        }
    }, [feedbacks]);

    return (
        <View className="flex-1 bg-background px-6 pt-16">
            <Text className="text-text-primary text-2xl font-bold mb-4">
                Moderator Feedback
            </Text>

            {feedbacks.length === 0 ? (
                <Text className="text-text-secondary">No feedback yet.</Text>
            ) : (
                 <FlatList
                 data={feedbacks.slice().reverse()} //neueste oben
                 keyExtractor={(item) => item.id}
                 renderItem={({item}) => (
                     <View className="bg-surface rounded-xl p-4 mb-3">
                         <Text className="text-text-secondary text-xs mb-1">
                             {new Date(item.createdAt).toLocaleString()}
                         </Text>
                         <Text className="text-text-primary">{item.text}</Text>
                         <Text className="text-text-secondary text-xs mt-1">
                             Type: {item.type}</Text>
                     </View>
                 )}
             />
            )}
        </View>
    );
}