import axios from "axios";

export const cancelReservationUseCase = async (
  reservationId: string
): Promise<string> => {
  const query = `
    mutation {
        cancelReservation(id: "${reservationId}")
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

    return response.data.data.cancelReservation;
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    throw error;
  }
};
