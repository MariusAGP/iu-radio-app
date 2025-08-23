import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export default function LoginScreen(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (): Promise<void> => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (error: any) {
            Alert.alert('Login Error', error.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center px-5 bg-background">
            <View className="items-center mb-12">
                <Text className="text-3xl font-bold text-text-primary mb-2">
                    Welcome Back
                </Text>
                <Text className="text-text-secondary text-center">
                    Sign in to your IU Radio account
                </Text>
            </View>

            <View>
                <View>
                    <Text className="text-text-primary text-sm font-medium mb-2 ml-1">
                        Email
                    </Text>
                    <TextInput
                        className="border border-gray-300 rounded-xl px-4 py-4 text-base bg-gray-50 focus:border-primary focus:bg-white"
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-text-primary text-sm font-medium mb-2 ml-1">
                        Password
                    </Text>
                    <TextInput
                        className="border border-gray-300 rounded-xl px-4 py-4 text-base bg-gray-50 focus:border-primary focus:bg-white"
                        placeholder="Enter your password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        editable={!loading}
                    />
                </View>
            </View>

            <TouchableOpacity
                className={`rounded-xl py-4 items-center justify-center min-h-[56px] ${
                    loading
                        ? 'bg-gray-400'
                        : 'bg-primary active:bg-primary'
                }`}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <View className="flex-row items-center">
                        <ActivityIndicator color="white" size="small" />
                        <Text className="text-white font-semibold text-base ml-2">
                            Signing In...
                        </Text>
                    </View>
                ) : (
                    <Text className="text-white font-semibold text-base">
                        Sign In
                    </Text>
                )}
            </TouchableOpacity>

            <View className="items-center mt-6">
                <Text className="text-gray-500 text-sm">
                    Having trouble signing in?
                </Text>
                <TouchableOpacity className="mt-2">
                    <Text className="text-primary text-sm font-medium">
                        Contact Support
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};