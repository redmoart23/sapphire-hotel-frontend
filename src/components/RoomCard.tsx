import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { RoomCardProps } from "@/interfaces/rooms.interface";

export default function RoomCard({
  room,
  dates,
  onBookClick,
  roomImage,
}: RoomCardProps) {
  
  return (
    <div className="border rounded-3xl overflow-hidden">
      <div className="p-6">
        <img
          src={roomImage}
          alt={`${room.roomName} - ${room.roomType}`}
          className="w-full h-48 object-cover bg-gray-200 mb-4 rounded-lg"
        />

        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">
            {room.roomName} - {room.roomType}
          </h3>
          <div className="text-right">
            <span className="font-bold">
              ${(room.roomPrice / 1000).toFixed(3)}
            </span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>
        </div>

        <p className="mb-2">{room.roomDesc}</p>
        <p className="text-sm text-gray-500 mb-4">
          Up to {room.roomCapacity} guests
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div>
            <div className="text-gray-500">Check in</div>
            <div>
              {dates?.from ? format(dates.from, "MMM d, yyyy") : "Select dates"}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Check out</div>
            <div>
              {dates?.to ? format(dates.to, "MMM d, yyyy") : "Select dates"}
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={onBookClick}
        >
          Book
        </Button>
      </div>
    </div>
  );
}
