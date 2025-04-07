import { GetReservationPrice } from "@/interfaces/get-reservations-price.interface";
import axios from "axios";

export const getReservationPriceUseCase = async ({
  roomId,
  guests,
  hasExtraServices,
  startDate,
  endDate,
}: GetReservationPrice) => {
  const query = `
{
  getReservationPrice(
    getReservationPriceInput: {
      roomId: "${roomId}"
      userId: "${import.meta.env.VITE_USER_ID}",
      guests: ${guests}
      hasExtraServices: ${hasExtraServices}
      startDate: "${startDate}"
      endDate: "${endDate}"
    }
  ) {
    basePrice
    discount
    extraServicesFee
    weekendSurcharge
    totalPrice
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

    return response.data.data.getReservationPrice;
  } catch (error) {
    console.error("Error getting reservation:", error);
    throw error;
  }
};
