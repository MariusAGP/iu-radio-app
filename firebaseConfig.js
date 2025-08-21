import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getDatabase} from "firebase/database";
import {getReactNativePersistence, initializeAuth} from "@firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyDlYZn_p6RbTDaU4IjsKYTH52Znyijfd7o",
    authDomain: "iu-radio-app.firebaseapp.com",
    databaseURL: "https://iu-radio-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "iu-radio-app",
    storageBucket: "iu-radio-app.firebasestorage.app",
    messagingSenderId: "818379053441",
    appId: "1:818379053441:web:1d027c435979e53896f080",
    measurementId: "G-1X82XLJNS2"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const realtimeDb = getDatabase(app);
const firestoreDb = getFirestore(app);

export { auth, realtimeDb, firestoreDb };