import { prisma } from "@/config";

export function createLocal() {
  return prisma.local.createMany({
    data: [
      {
        id: 1,
        name: "Auditório Principal",
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 2,
        name: "Auditório Lateral",
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
      {
        id: 3,
        name: "Sala de Workshop",
        createdAt: "2022-12-16T02:12:42.501Z",
        updatedAt: "2022-12-16T02:12:42.501Z",
      },
    ],
  });
}
