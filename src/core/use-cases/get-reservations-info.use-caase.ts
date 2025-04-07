import axios from "axios";

export const getReservationsInfoUseCase = async () => {
  const query = `
{
  reservations {
    id
    totalPrice
    startDate
    endDate
    guests
    room{
      roomName
      roomType
    }
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

    return response.data.data.reservations;
  } catch (error) {
    console.error("Error getting reservations price:", error);
    throw error;
  }
};
