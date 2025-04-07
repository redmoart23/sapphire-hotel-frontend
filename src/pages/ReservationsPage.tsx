import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cancelReservationUseCase } from "@/core/use-cases/cancel-reservation.use-case";
import { getReservationsInfoUseCase } from "@/core/use-cases/get-reservations-info.use-caase";
import { ReservationsResponse } from "@/interfaces/get-reservations-price.interface";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReservationsPage() {
  const navigation = useNavigate();
  const [reservations, setReservations] = useState<ReservationsResponse[]>([]);

  useEffect(() => {
    const response = getReservationsInfoUseCase();
    response.then((data) => setReservations(data));
  }, []);

  if (!reservations || reservations.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header activeTab="reservations" />
        <main className="container mx-auto px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Reservations Summary</h2>
          <p className="text-center text-lg">No reservations found.</p>
        </main>
      </div>
    );
  }

  const handleCancelReservation = async (reservationId: string) => {
    await cancelReservationUseCase(reservationId);
    toast.info("🗑️Reservation canceled successfully");
    navigation(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="reservations" />

      <main className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Reservations History</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">
                  {reservation.room.roomName} - {reservation.room.roomType}
                </h3>
                <span className="font-bold">
                  ${reservation.totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="text-sm mb-1">
                {reservation.guests}{" "}
                {reservation.guests === 1 ? "Guest" : "Guests"}
              </div>

              <div
                className="inline-block px-2 py-1 rounded-full text-xs mb-3 
                              ${getStatusColor(reservation.status)}"
              >
                <Badge variant="success">confirmed</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div>
                  <div className="text-gray-500">Check in</div>
                  <div>{format(reservation.startDate, "MMM d, yyyy")}</div>
                </div>
                <div>
                  <div className="text-gray-500">Check out</div>
                  <div>{format(reservation.endDate, "MMM d, yyyy")}</div>
                </div>
              </div>

              <Button
                onClick={() => handleCancelReservation(reservation.id)}
                variant="destructive"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
