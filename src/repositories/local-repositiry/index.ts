import { prisma } from "@/config";

async function findActivitiesWithDateId(dateId: number) {
  return prisma.local.findMany({
    include: {
      Activities: {
        where: {
          dateId,
        },
        include: {
          BookingActivities: true
        }
      },
    },
  });
}

const localRepository = {
  findActivitiesWithDateId,
};

export default localRepository;
