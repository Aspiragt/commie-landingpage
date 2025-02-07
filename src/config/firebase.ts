import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD6aXCg-UEFHJdzAl0Z3g3YZ1hnbpaKLHU',
  authDomain: 'commie-47682.firebaseapp.com',
  projectId: 'commie-47682',
  storageBucket: 'commie-47682.firebasestorage.app',
  messagingSenderId: '1006980871771',
  appId: '1:1006980871771:ios:335021b4d632a2f0b3f17e',
};

// Initialize Firebase
if (!app().apps?.length) {
  try {
    app().configure(firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export { app, auth };
