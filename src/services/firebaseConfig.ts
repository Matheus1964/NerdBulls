import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6OSirqlL8YNEMcsGWveQ5OiFpL7R7In4",
  authDomain: "nerdbulls-483cf.firebaseapp.com",
  projectId: "nerdbulls-483cf",
  storageBucket: "nerdbulls-483cf.appspot.com",
  messagingSenderId: "1068148064538",
  appId: "1:1068148064538:web:bebd3ab4c7f41141056ca3",
  measurementId: "G-54R3131VJN"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth, onAuthStateChanged};
