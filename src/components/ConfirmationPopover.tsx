import { useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";
import { X } from "lucide-react";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getReservationPriceUseCase } from "@/core/use-cases/get-reservation-price.use-case";
import { GetReservationPriceResponse } from "@/interfaces/get-reservations-price.interface";
import { ConfirmationPopoverProps } from "@/interfaces/confirmation-pop-over.interface";

export default function ConfirmationPopover({
  open,
  onOpenChange,
  room,
  dates,
  guests,
  onConfirm,
  allInclusive,
  setAllInclusive,
}: ConfirmationPopoverProps) {
  const [reservationData, setReservationData] =
    useState<GetReservationPriceResponse>();

  // Calculate nights
  const nights =
    dates?.from && dates?.to ? differenceInDays(dates.to, dates.from) : 0;

  useEffect(() => {
    const response = getReservationPriceUseCase({
      roomId: room.id,
      guests: guests,
      hasExtraServices: allInclusive,
      startDate: dates?.from ? format(dates.from, "yyyy-MM-dd") : "",
      endDate: dates?.to ? format(dates.to, "yyyy-MM-dd") : "",
    });

    response.then((data) => setReservationData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allInclusive]);

  // Calculate days
  const days = nights + 1;

  if (!reservationData) {
    return null;
  }

  const basePrice = reservationData?.basePrice ;
  const discount = reservationData?.discount ;
  const allInclusivePrice = reservationData?.extraServicesFee;
  const weekendSurcharge = reservationData?.weekendSurcharge;
  const total = basePrice - discount + allInclusivePrice + weekendSurcharge;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden">
        <div className="relative p-6">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex flex-col items-center mb-4">
            {/* <img
              src={"/room.jpg"}
              alt={`${room.roomName} - ${room.roomType}`}
              className="w-40 h-32 object-cover bg-gray-200 mb-4 rounded-lg"
            /> */}

            <h3 className="text-lg font-semibold">
              {room.roomName} - {room.roomType}
            </h3>
            <p className="text-sm text-center">{room.roomDesc}</p>
          </div>

          <div className="grid grid-cols-3 text-center mb-6">
            <div>
              <div className="font-semibold">Days</div>
              <div>{days}</div>
            </div>
            <div>
              <div className="font-semibold">Nights</div>
              <div>{nights}</div>
            </div>
            <div>
              <div className="font-semibold">Guests</div>
              <div>{guests}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-4 text-center">
            <div>
              <div className="text-gray-500">Check in</div>
              <div>
                {dates?.from
                  ? format(dates.from, "MMM d, yyyy")
                  : "Select dates"}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Check out</div>
              <div>
                {dates?.to ? format(dates.to, "MMM d, yyyy") : "Select dates"}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6 justify-center">
            <Checkbox
              id="all-inclusive"
              checked={allInclusive}
              onCheckedChange={(checked) => setAllInclusive(checked as boolean)}
            />
            <Label
              htmlFor="all-inclusive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-600"
            >
              Want all included?
            </Label>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <div>Base Price</div>
              <div className="font-semibold">${basePrice.toLocaleString()}</div>
            </div>
            <div className="flex justify-between text-red-600">
              <div>Discount</div>
              <div className="font-semibold">-${discount.toLocaleString()}</div>
            </div>
            {allInclusive && (
              <div className="flex justify-between">
                <div>All included</div>
                <div className="font-semibold">
                  ${allInclusivePrice.toLocaleString()}
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <div>Weekend surcharge</div>
              <div className="font-semibold">
                ${weekendSurcharge.toLocaleString()}
              </div>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <div>Total</div>
              <div>${total.toLocaleString()}</div>
            </div>
          </div>

          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={onConfirm}
          >
            confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
