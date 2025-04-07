export interface GetReservationPrice {
  roomId: string;
  guests: number;
  hasExtraServices: boolean;
  startDate: string;
  endDate: string;
}

export interface GetReservationPriceResponse {
  basePrice: number;
  discount: number;
  extraServicesFee: number;
  weekendSurcharge: number;
  totalPrice: number;
}
export interface ReservationsResponse {
  id: string;
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  guests: number;
  room: Room;
}

export interface Room {
  roomName: string;
  roomType: string;
}

export interface CreateReservationResponse {
  id: string;
  roomId: string;
  basePrice: number;
  discount: number;
  extraServicesFee: number;
  weekendSurcharge: number;
  totalPrice: number;
  totalDays: number;
  totalNights: number;
}
