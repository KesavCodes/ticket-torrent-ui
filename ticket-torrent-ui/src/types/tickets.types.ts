export interface TicketRequest {
  eventId: string;
  price: number;
  quantity: number;
  status: string;
  category: string;
}

export interface TicketResponse extends TicketRequest {
  id: string;
  userId: string;
  createdAt: Date;
}
