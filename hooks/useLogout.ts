import {signOut} from 'firebase/auth';
import {Alert} from 'react-native';
import {auth} from '@/firebaseConfig';

export const useLogout = () => {
    const handleLogout = async (): Promise<void> => {
        try {
            await signOut(auth);
        } catch (error: any) {
            Alert.alert('Logout Error', error.message || 'An error occurred during logout');
        }
    };

    return { handleLogout };
};