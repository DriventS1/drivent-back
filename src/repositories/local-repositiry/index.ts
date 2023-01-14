import { prisma, redisClient } from "@/config";

async function findActivitiesWithDateId(dateId: number) {
  const activities = await redisClient.get(`dateId: ${dateId}`);

  if (!activities) {
    const activitiesWithBooking = await prisma.local.findMany({
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

    await redisClient.set(`dateId: ${dateId}`, JSON.stringify(activitiesWithBooking));
    return activitiesWithBooking;
  }

  return JSON.parse(activities);
}

const localRepository = {
  findActivitiesWithDateId,
};

export default localRepository;
