import axios from "axios";

export const getRoomsUseCase = async (
  startDate: string,
  endDate: string,
  roomCapacity: number
) => {
  const query = `
  {
    rooms(startDate: "${startDate}", endDate: "${endDate}", roomCapacity: ${roomCapacity})
    {
        id
        roomName
        roomDesc
        roomType
        roomPrice
        roomCapacity
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

    return response.data.data.rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
