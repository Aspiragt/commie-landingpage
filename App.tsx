import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingNavigator } from './src/navigation/OnboardingNavigator';
import { MainTabNavigator } from './src/navigation/MainTabNavigator';
import { useAuth } from './src/contexts/AuthContext';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/styles/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  const { user } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar style="light" backgroundColor={theme.colors.background} />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                  <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                ) : (
                  <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
