import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, requestError, conflictError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import activitiesRepository from "@/repositories/activities-repository";
import { Activity } from "@/protocols";
import dayjs from "dayjs";
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

async function checkIsCurrentEventActive(activity: Activity, userId: number) {
  const eventStartsAt = dayjs(activity.startsAt);
  const eventEndsAt = dayjs(activity.endsAt);
 
  const events = await activitiesRepository.listActivitiesByDateId(activity.dateId, userId);
  const eventsByUser = events.filter(event => event.BookingActivities.length > 0);
  
  if (eventsByUser.length === 0) {
    return;
  }
  eventsByUser.map(event => {
    const firstActivitStarts = dayjs(event.startsAt);
    const firstActivitEnds = dayjs(event.endsAt);

    const hasConflict = (firstActivitStarts.isAfter(eventStartsAt) && firstActivitStarts.isBefore(eventEndsAt)) || (firstActivitEnds.isAfter(eventStartsAt) && firstActivitEnds.isBefore(eventEndsAt));
    if (hasConflict) {
      throw conflictError("time conflict");
    }
  });
}

async function checkAvailability(activity: Activity) {
  const capacity = activity.capacity;
  const subscriptions = await activitiesRepository.listSubscriptionsByActivityId(activity.id);
  if (subscriptions.length >= capacity) {
    throw conflictError("no vacancies");
  }
}

async function getDateActivities(userId: number) {
  await checkEnrollmentAndTicket(userId);

  const dateActivities = await activitiesRepository.findDateActivities();
  return dateActivities;
}

async function bookingActivity(userId: number, activitiesId: number) {
  if (userId < 1 || activitiesId < 1 || isNaN(activitiesId)) {
    throw requestError(400, "BAD_REQUEST");
  }
  await checkEnrollmentAndTicket(userId);

  const activity = await activitiesRepository.findActivityById(activitiesId);
  if (!activity) {
    throw notFoundError();
  }
  await checkIsCurrentEventActive(activity, userId);
  await checkAvailability(activity);

  const createdActivity = await activitiesRepository.create(userId, activitiesId, activity.dateId);
  return createdActivity;
}

async function getActivitiesByDateId(userId: number, dateId: number) {
  await checkEnrollmentAndTicket(userId);

  const activities = await localRepository.findActivitiesWithDateId(dateId);
  return activities;
}

const activitiesService = {
  getDateActivities,
  bookingActivity,
  getActivitiesByDateId,
};

export default activitiesService;
 
