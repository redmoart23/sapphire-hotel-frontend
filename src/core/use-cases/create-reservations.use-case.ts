import {
  CreateReservationResponse,
  GetReservationPrice,
} from "@/interfaces/get-reservations-price.interface";
import axios from "axios";

export const createReservationsUseCase = async ({
  roomId,
  guests,
  hasExtraServices,
  startDate,
  endDate,
}: GetReservationPrice): Promise<CreateReservationResponse> => {
  const query = `
    mutation {
    createReservation(
        createReservationInput: {
        roomId: "${roomId}"
        userId: "${import.meta.env.VITE_USER_ID}"
        guests: ${guests}
        hasExtraServices: ${hasExtraServices}
        startDate: "${startDate}"
        endDate: "${endDate}"
        }
    ) {
        id
        roomId
        basePrice
        discount
        extraServicesFee
        weekendSurcharge
        totalPrice
        totalDays
        totalNights
    }
    }
  `;

  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data.createReservation;
  } catch (error) {
    console.error("Error getting reservation:", error);
    throw error;
  }
};
