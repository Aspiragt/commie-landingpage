export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  category: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  creator_id: string;
  created_at: string;
  description?: string;
  image_url?: string;
  member_count: number;
}

export interface Event {
  id: string;
  community_id?: string;
  name: string;
  description?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  datetime: string;
  creator_id: string;
  created_at: string;
  image_url?: string;
  attendee_count: number;
}

export interface EventAttendee {
  id: string;
  event_id: string;
  user_id: string;
  confirmed_at: string;
}

export interface EventMessage {
  id: string;
  event_id: string;
  user_id: string;
  message: string;
  sent_at: string;
}

export interface CommunityMember {
  id: string;
  community_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}
