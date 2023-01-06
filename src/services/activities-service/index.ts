import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import activitiesRepository from "@/repositories/activities-repository";
import localRepository from "@/repositories/local-repositiry";

async function checkEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw cannotListHotelsError();
  }
}

async function getDateActivities(userId: number) {
  await checkEnrollmentAndTicket(userId);

  const dateActivities = await activitiesRepository.findDateActivities();
  return dateActivities;
}

async function getActivitiesByDateId(userId: number, dateId: number) {
  await checkEnrollmentAndTicket(userId);

  const activities = await localRepository.findActivitiesWithDateId(dateId);
  return activities;
}

const activitiesService = {
  getDateActivities,
  getActivitiesByDateId,
};

export default activitiesService;
