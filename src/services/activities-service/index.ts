import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, requestError, conflictError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import activitiesRepository from "@/repositories/activities-repository";
import { Activity } from "@/protocols";
import dayjs from "dayjs";

async function checkEnrollmentAndTicket(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw cannotListHotelsError();
  }
}

async function checkIsCurrentEventActive(activity: Activity) {
  const eventStartsAt = dayjs(activity.startsAt);
  const eventEndsAt = dayjs(activity.endsAt);
 
  const events = await activitiesRepository.listActivitiesByDateId(activity.dateId);
  if (events.length === 0) {
    return;
  }
  events.map(event => {
    const firstActivitStarts = dayjs(event.startsAt);
    const firstActivitEnds = dayjs(event.endsAt);

    const hasConflict = firstActivitStarts.isAfter(eventStartsAt) && firstActivitEnds.isBefore(eventEndsAt);
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
  if (userId < 1 || activitiesId < 1) {
    throw requestError(400, "BAD_REQUEST");
  }
  await checkEnrollmentAndTicket(userId);

  //TO-DO: Se a atividade conflita deve dá erro de conflito
  const activity = await activitiesRepository.findActivityById(activitiesId);
  await checkIsCurrentEventActive(activity);
  await checkAvailability(activity);

  const createdActivity = await activitiesRepository.create(userId, activitiesId);
  return createdActivity;
}

const activitiesService = {
  getDateActivities,
  bookingActivity
};

export default activitiesService;
 
