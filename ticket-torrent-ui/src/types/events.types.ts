export interface Event {
  id: string;
  name: string;
  description: string;
  cover: string;
  date: string | Date;
  city: {
    id: string;
    name: string;
  };
  cityId?: string;
  address: string;
  category: string;
  tags: [string];
  prices: [number];
  favorite: boolean;
  hostedBy: string;
}

export interface EventRequest {
  name: string;
  description: string;
  cover: string;
  date: Date | string;
  dateTime: Date | string;
  address: string;
  cityId: string;
  category: string;
  tags: string[];
  hostedBy: string;
  userId: string;
}
