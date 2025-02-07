export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  categories: string[];
  lastActivity: string;
  joined?: string;
  posts: Post[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  attendees: number;
  image: string;
  categories: string[];
  isJoined?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
