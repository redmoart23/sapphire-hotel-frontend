import type { DateRange } from "react-day-picker";

export interface ConfirmationPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: {
    id: string;
    roomName: string;
    roomType: string;
    roomDesc: string;
    roomPrice: number;
    roomCapacity: number;
  };
  dates?: DateRange;
  guests: number;
  onConfirm: () => void;
  allInclusive: boolean;
  setAllInclusive: React.Dispatch<React.SetStateAction<boolean>>;
}
