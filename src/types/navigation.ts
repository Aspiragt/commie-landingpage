export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
  CreateCommunity: undefined;
  CreateEvent: undefined;
  Search: undefined;
  SuggestedCommunities: undefined;
  MyCommunities: undefined;
  CommunityDetail: {
    community: {
      id: number;
      name: string;
      description: string;
      members: number;
      category: string;
      tags: string[];
      image: string;
      avatar: string;
      coverImage: string;
    };
  };
  EventDetail: {
    eventId: number;
  };
  FeaturedEvents: undefined;
  Explore: undefined;
  Profile: {
    userId?: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Communities: undefined;
  Events: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};
