import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import {useMusicStore} from "@/stores/musicStore";
import {musicService} from "@/services/musicService";
import * as Progress from 'react-native-progress';
import {Ionicons} from "@expo/vector-icons";
import {useAuth} from "@/contexts/AuthContext";
import {useLogout} from "@/hooks/useLogout";

export default function HomeScreen() {
    const {
        currentSong,
        progress,
        currentIndex,
        playlist
    } = useMusicStore();

    const { user } = useAuth();
    const { handleLogout } = useLogout();

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackType, setFeedbackType] = useState<'song' | 'moderator'>('song');
    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
        musicService.initialize();

        return () => {
            musicService.cleanup();
        };
    }, []);

    const formatTime = (milliseconds: number): string => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getProgress: () => number = (): number => {
        if (!currentSong?.duration) return 0;
        return Math.min((progress / currentSong.duration), 100);
    };

    const handleSongFeedback = (isLike: boolean) => {
        if (!currentSong) return;

        Alert.alert(
            'Feedback Received',
            `Thanks for ${isLike ? 'liking' : 'providing feedback on'} "${currentSong.title}"!`,
            [{ text: 'OK' }]
        );
    };

    const openFeedbackModal = (type: 'song' | 'moderator') => {
        setFeedbackType(type);
        setFeedbackText('');
        setShowFeedbackModal(true);
    };

    const submitFeedback = () => {
        if (feedbackText.trim()) {
            console.log(`${feedbackType} feedback:`, feedbackText);

            setShowFeedbackModal(false);
            setFeedbackText('');
        }
    };

    return (
        <View className="flex-1 bg-gradient-to-b from-gray-900 to-black">
            {/* Profile info Header */}
            <View className={"pt-2 px-6 flex-row items-center justify-between"}>
                <Text className={"text-text-primary text-xl font-bold"}>Welcome, {user?.email}</Text>

                <TouchableOpacity onPress={handleLogout}>
                    <View className={"flex-row"}>
                        <Text className={"text-text-primary text-xl mr-2 underline"}>Logout</Text>
                        <Ionicons name={"log-out-outline"} size={24} color={"white"}/>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Header */}
            <View className="pt-16 pb-8 px-6">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-white text-2xl font-bold">IU Radio</Text>
                        <View className="flex-row items-center mt-1">
                            <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                            <Text className="text-red-400 text-sm font-medium">LIVE ON AIR</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => openFeedbackModal('moderator')}
                        className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700"
                    >
                        <Text className="text-gray-300 text-sm">Feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <View className="flex-1 px-6">
                {/* Album Cover */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <Image
                            source={{ uri: currentSong?.coverUrl}}
                            style={{ width: 320, height: 320, borderRadius: 24 }}
                            defaultSource={require('../../../assets/default-cover.png')}
                        />

                        {/* Genre Badge */}
                        <View className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                            <Text className="text-white text-xs font-medium">{currentSong?.genre}</Text>
                        </View>
                    </View>
                </View>

                {/* Song Info */}
                <View className="mb-8">
                    <Text className="text-white text-3xl font-bold text-center mb-2" numberOfLines={2}>
                        {currentSong?.title}
                    </Text>
                    <Text className="text-gray-300 text-xl text-center mb-1" numberOfLines={1}>
                        {currentSong?.artist}
                    </Text>
                    {currentSong?.album && (
                        <Text className="text-gray-500 text-lg text-center" numberOfLines={1}>
                            {currentSong?.album}
                        </Text>
                    )}
                </View>

                {/* Progress Bar */}
                <View className="mb-8">
                    <Progress.Bar
                        progress={getProgress()}
                        width={null}
                        borderWidth={0}
                        unfilledColor={"#2D3748"}
                        animationType={"timing"}
                    />

                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-400 text-sm font-mono">
                            {formatTime(progress)}
                        </Text>
                        <Text className="text-gray-400 text-sm font-mono">
                            {formatTime(currentSong?.duration || 0)}
                        </Text>
                    </View>
                </View>

                {/* Song Feedback */}
                <View className="mb-6">
                    <Text className="text-gray-400 text-center text-sm mb-4">How's this track?</Text>
                    <View className="flex-row justify-evenly">
                        <TouchableOpacity
                            onPress={() => handleSongFeedback(false)}
                            className="w-14 h-14 bg-gray-800 rounded-full justify-center items-center border border-gray-700 active:bg-gray-700"
                        >
                            <Ionicons name={"heart-dislike"} size={20} color={"red"}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleSongFeedback(true)}
                            className="w-14 h-14 bg-gray-800 rounded-full justify-center items-center border border-gray-700 active:bg-gray-700"
                        >
                            <Ionicons name={"heart"} size={20} color={"green"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};