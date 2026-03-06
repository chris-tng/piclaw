export interface TimelinePost {
  id: number;
  timestamp: string;
  data: Record<string, any>;
}

export interface TimelineResponse {
  posts: TimelinePost[];
  has_more: boolean;
}
