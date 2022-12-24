import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: true,
    },
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

async function findBookingsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: { 
        include: {
          _count: {
            select: { Booking: true }
          }
        }
      }
    }
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findBookingsByHotelId
};

export default hotelRepository;
