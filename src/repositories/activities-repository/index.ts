import { prisma } from "@/config";
import { redisClient } from "@/config";

async function findDateActivities() {
  const dateActivities = await redisClient.get("dateActivities");

  if (!dateActivities) {
    const dateWithActivities = await prisma.dateActivity.findMany();
    await redisClient.set("dateActivities", JSON.stringify(dateWithActivities));
    return dateWithActivities;
  }

  return JSON.parse(dateActivities);
} 

async function create(userId: number, activitiesId: number) {
  return prisma.bookingActivities.create({
    data: {
      userId,
      activitiesId
    }
  });
}

async function findActivityById(activitiesId: number) {
  return prisma.activities.findFirst({
    where: {
      id: activitiesId
    }
  });
}

async function listSubscriptionsByActivityId(activitiesId: number) {
  return prisma.bookingActivities.findMany({
    where: {
      activitiesId
    }
  });
}

async function listActivitiesByDateId(dateId: number, userId: number) {
  return prisma.activities.findMany({
    where: {
      dateId,
    },
    include: {
      BookingActivities: {
        where: {
          userId
        }
      }
    }
  });
}

const activitiesRepository = {
  findDateActivities,
  create,
  findActivityById,
  listSubscriptionsByActivityId,
  listActivitiesByDateId
};

export default activitiesRepository;
