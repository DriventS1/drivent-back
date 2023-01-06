import { prisma } from "@/config";

export function createDateActivity() {
  return prisma.dateActivity.createMany({
    data: [
      {
        id: 1,
        date: "2023-01-16T02:12:42.501Z",
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 2,
        date: "2023-01-17T02:12:42.501Z",
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 3,
        date: "2023-01-18T02:12:42.501Z",
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
    ],
  });
}

export function createActivities() {
  return prisma.activities.createMany({
    data: [
      {
        id: 1,
        name: "Minecraft: montando o PC ideal",
        capacity: 30,
        startsAt: "2023-01-16T02:09:00.501Z",
        endsAt: "2023-01-16T02:10:00.501Z",
        dateId: 1,
        localId: 1,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 2,
        name: "LoL: montando o PC ideal",
        capacity: 5,
        startsAt: "2023-01-16T02:10:00.501Z",
        endsAt: "2023-01-16T02:11:00.501Z",
        dateId: 1,
        localId: 1,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 3,
        name: "Palestra x",
        capacity: 35,
        startsAt: "2023-01-16T02:09:00.501Z",
        endsAt: "2023-01-16T02:11:00.501Z",
        dateId: 1,
        localId: 2,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 4,
        name: "Palestra y",
        capacity: 25,
        startsAt: "2023-01-16T02:09:00.501Z",
        endsAt: "2023-01-16T02:10:00.501Z",
        dateId: 1,
        localId: 3,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 5,
        name: "Palestra z",
        capacity: 15,
        startsAt: "2023-01-16T02:10:00.501Z",
        endsAt: "2023-01-16T02:11:00.501Z",
        dateId: 1,
        localId: 3,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 6,
        name: "Minecraft: montando o PC ideal",
        capacity: 30,
        startsAt: "2023-01-17T02:09:00.501Z",
        endsAt: "2023-01-16T02:10:00.501Z",
        dateId: 2,
        localId: 1,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 7,
        name: "LoL: montando o PC ideal",
        capacity: 5,
        startsAt: "2023-01-17T02:10:00.501Z",
        endsAt: "2023-01-16T02:11:00.501Z",
        dateId: 2,
        localId: 1,
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
    ],
  });
}
