import { prisma } from "@/config";

async function findDateActivities() {
  return prisma.dateActivity.findMany();
}

const activitiesRepository = {
  findDateActivities,
};

export default activitiesRepository;
