import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

import { cleanDb } from "../tests/helpers"

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
  console.log({ event });
}

async function types() {
  let event = await prisma.ticketType.findFirst();
  if (!event) {
    await prisma.ticketType.createMany({
      data: [
          {
            id: 3,
            name: 'Online',
            price: 100,
            isRemote: true,
            includesHotel: false,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 2,
            name: 'Presencial',
            price: 600,
            isRemote: false,
            includesHotel: true,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 1,
            name: 'Presencial',
            price: 250,
            isRemote: false,
            includesHotel: false,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          }
        ]
    }
    );
  }

  console.log('Ticket Types criados com sucesso');
}

async function hotel() {
  let event = await prisma.hotel.findFirst();
  if (!event) {
    await prisma.hotel.createMany({
      data: [
          {
            id: 1,
            name: 'Hotel 1',
            image: "https://files.driveneducation.com.br/images/logo-rounded.png",
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 2,
            name: 'Hotel 2',
            image: "https://files.driveneducation.com.br/images/logo-rounded.png",
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 3,
            name: 'Hotel 3',
            image: "https://files.driveneducation.com.br/images/logo-rounded.png",
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          }
        ]
    }
    );
  }

  console.log('Hoteis criados com sucesso');
}

async function rooms() {
  let event = await prisma.room.findFirst();
  if (!event) {
    await prisma.room.createMany({
      data: [
          {
            id: 1,
            name: 'Room 1',
            capacity: 1,
            hotelId: 1,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 2,
            name: 'Room 2',
            capacity: 2,
            hotelId: 1,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 3,
            name: 'Room 3',
            capacity: 3,
            hotelId: 1,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 4,
            name: 'Room 4',
            capacity: 2,
            hotelId: 1,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 5,
            name: 'Room 5',
            capacity: 1,
            hotelId: 2,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 6,
            name: 'Room 6',
            capacity: 2,
            hotelId: 2,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 7,
            name: 'Room 7',
            capacity: 3,
            hotelId: 2,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 8,
            name: 'Room 8',
            capacity: 2,
            hotelId: 2,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 9,
            name: 'Room 9',
            capacity: 1,
            hotelId: 3,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 10,
            name: 'Room 10',
            capacity: 2,
            hotelId: 3,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 11,
            name: 'Room 11',
            capacity: 3,
            hotelId: 3,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          {
            id: 12,
            name: 'Room 12',
            capacity: 2,
            hotelId: 3,
            createdAt: '2022-12-16T02:12:42.501Z',
            updatedAt: '2022-12-16T02:12:42.501Z'
          },
          
        ]
    }
    );
  }

  console.log('Quartos criados com sucesso');
}

  main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    //await prisma.$disconnect();
  });

  hotel()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    //await prisma.$disconnect();
  });

  types()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    //await prisma.$disconnect();
  });

  rooms()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
