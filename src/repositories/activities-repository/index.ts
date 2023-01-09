import { prisma } from "@/config";

async function findDateActivities() { 
  return prisma.dateActivity.findMany();
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

//Pegar um array de inscrições na atividade
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
      dateId
    },
    include: {
      BookingActivities: {
        select: {
          userId: true
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
