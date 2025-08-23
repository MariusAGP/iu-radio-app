import {Tabs} from 'expo-router';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";

export default function TabLayout() {

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: '#1A202C'}}
            edges={['top', 'left', 'right']}
        >
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#4DB6AC',
                    tabBarStyle: Platform.select({
                        ios: {
                            position: 'absolute',
                            backgroundColor: '#2D3748',
                            borderColor: '#4A5568',
                        },
                        default: {
                            backgroundColor: '#2D3748',
                            borderColor: '#4A5568',
                        },
                    }),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        sceneStyle: {backgroundColor: '#1A202C'},
                        tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="request"
                    options={{
                        sceneStyle: {backgroundColor: '#1A202C'},
                        title: 'Requests',
                        tabBarIcon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
                    }}
                />
                {/* Tab sollte nur für Moderator sichtbar sein */}
                <Tabs.Screen
                    name="moderator"
                    options={{
                        sceneStyle: {backgroundColor: '#1A202C'},
                        title: 'Mod-Dashboard',
                        tabBarIcon: ({ color }) => <Ionicons size={28} name="folder" color={color} />,
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
