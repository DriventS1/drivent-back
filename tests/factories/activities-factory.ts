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
        name: "Palestra x",
        capacity: 35,
        dateId: 1,
        localId: 2,
        startsAt: "2022-12-16T02:10:00.501Z",
        endsAt: "2022-12-16T02:40:00.501Z"
      },
    ]
  });
}
