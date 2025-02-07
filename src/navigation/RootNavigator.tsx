import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { ExploreScreen } from '../screens/explore/ExploreScreen';
import { CreateCommunityScreen } from '../screens/communities/CreateCommunityScreen';
import { CreateEventScreen } from '../screens/events/CreateEventScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { SuggestedCommunitiesScreen } from '../screens/communities/SuggestedCommunitiesScreen';
import { MyCommunitiesScreen } from '../screens/communities/MyCommunitiesScreen';
import { CommunityDetailScreen } from '../screens/communities/CommunityDetailScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { theme } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  // TODO: Add auth state management
  const isAuthenticated = true;

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
          <Stack.Screen 
            name="CreateCommunity" 
            component={CreateCommunityScreen} 
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="CreateEvent" 
            component={CreateEventScreen} 
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="SuggestedCommunities" 
            component={SuggestedCommunitiesScreen} 
          />
          <Stack.Screen 
            name="MyCommunities"
            component={MyCommunitiesScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="CommunityDetail" 
            component={CommunityDetailScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
