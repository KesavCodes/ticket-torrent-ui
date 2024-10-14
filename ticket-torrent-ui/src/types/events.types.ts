export interface Event {
  id: string;
  name: string;
  description: string;
  cover: string;
  date: Date;
  city: {
    id: string;
    name: string;
  };
  address: string;
  category: string;
  tags: [string];
  prices: [number];
  favorite: boolean;
  hostedBy: string;
}
