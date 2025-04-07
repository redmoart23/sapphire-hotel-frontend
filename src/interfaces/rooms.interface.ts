import type { DateRange } from "react-day-picker";

export interface RoomsResponse {
  id: string;
  roomName: string;
  roomDesc: string;
  roomType: RoomType;
  roomPrice: number;
  hasExtraServices: boolean;
  roomCapacity: number;
}

export enum RoomType {
  Double = "DOUBLE",
  Single = "SINGLE",
  Suite = "SUITE",
}

export interface RoomCardProps {
  room: {
    id: string;
    roomName: string;
    roomType: string;
    roomDesc: string;
    roomPrice: number;
    roomCapacity: number;
  };
  roomImage: string;
  dates?: DateRange;
  onBookClick: () => void;
}
