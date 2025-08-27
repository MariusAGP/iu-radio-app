import {Text, View, FlatList} from "react-native";
import {useFeedbackStore} from "@/stores/feedbackStore";

export default function ModeratorScreen() {
    const {feedbacks} = useFeedbackStore();

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
                     </View>
                 )}
             />
            )}
        </View>
    );
}