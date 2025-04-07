import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import RoomCard from "@/components/RoomCard";
import ConfirmationPopover from "@/components/ConfirmationPopover";
import { RoomsResponse } from "@/interfaces/rooms.interface";
import { getRoomsUseCase } from "@/core/use-cases/get-rooms.use-case";
import { useState } from "react";
import { createReservationsUseCase } from "@/core/use-cases/create-reservations.use-case";
import { images } from "@/utils/images";
import { toast } from "react-toastify";

export default function BookingPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("1");
  const [selectedRoom, setSelectedRoom] = useState<RoomsResponse | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomsResponse[]>([]);
  const [allInclusive, setAllInclusive] = useState(false);

  const handleBookClick = (room: RoomsResponse) => {    
    setSelectedRoom(room);
    setConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    await createReservationsUseCase({
      roomId: selectedRoom?.id || "",
      guests: Number.parseInt(guests),
      hasExtraServices: allInclusive || false,
      startDate:
        date?.from?.toISOString().split("T")[0] || new Date().toISOString(),
      endDate:
        date?.to?.toISOString().split("T")[0] || new Date().toISOString(),
    });

    toast.success("Reservation created successfully");
    setConfirmationOpen(false);
    navigate("/reservations");
  };

  const handleSearchRooms = async () => {
    const startDate =
      date?.from?.toISOString().split("T")[0] || new Date().toISOString();
    const endDate =
      date?.to?.toISOString().split("T")[0] || new Date().toISOString();

    const roomCapacity = Number.parseInt(guests) || 1;

    const rooms = await getRoomsUseCase(startDate, endDate, roomCapacity);
    setRooms(rooms);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="booking" />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
          <div className="w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[300px] justify-start text-left font-normal border-2",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "MMM dd, yyyy")} —{" "}
                        {format(date.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(date.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Check in — Check out</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={[{ before: new Date() }]}
                  classNames={{
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary/90", // use your Tailwind CSS vars
                    day_range_middle: "bg-primary/30 text-primary-foreground",
                    day_range_start:
                      "bg-primary text-primary-foreground hover:bg-primary/90 rounded-l-md",
                    day_range_end:
                      "bg-primary text-primary-foreground hover:bg-primary/90 rounded-r-md",
                    day_today: "border border-ring",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 guest</SelectItem>
              <SelectItem value="2">2 guests</SelectItem>
              <SelectItem value="3">3 guests</SelectItem>
              <SelectItem value="4">4 guests</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleSearchRooms}
            className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-600"
          >
            Search
          </Button>
        </div>

        {rooms.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">No rooms found</h2>
              <p className="text-gray-500">
                We couldn&apos;t find any rooms that match your search criteria.
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              dates={date}
              onBookClick={() => handleBookClick(room)}
              roomImage={images[index % images.length]}
            />
          ))}
        </div>
      </main>

      {selectedRoom && (
        <ConfirmationPopover
          open={confirmationOpen}
          onOpenChange={setConfirmationOpen}
          room={selectedRoom}
          dates={date}
          guests={Number.parseInt(guests)}
          onConfirm={handleConfirm}
          allInclusive={allInclusive}
          setAllInclusive={setAllInclusive}
        />
      )}
    </div>
  );
}
