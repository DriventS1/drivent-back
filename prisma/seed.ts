import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

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

  console.log('TicketTypes criados com sucesso');
}

main()
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
    await prisma.$disconnect();
  });
