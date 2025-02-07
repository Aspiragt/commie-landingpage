import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainTabParamList = {
  Home: undefined;
  Communities: undefined;
  Events: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  Profile: { userId: string } | undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Explore: undefined;
  CreateCommunity: undefined;
  CreateEvent: undefined;
  Search: undefined;
  SuggestedCommunities: undefined;
  MyCommunities: undefined;
  CommunityDetail: { communityId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;
