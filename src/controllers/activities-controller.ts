import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import activitiesService from "@/services/activities-service";

export async function listDateActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const dateActivities = await activitiesService.getDateActivities(userId);
    return res.status(httpStatus.OK).send(dateActivities);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListHotelsError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function bookingActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const activitiesId = req.body.activitiesId as number;
    const createdActivity = await activitiesService.bookingActivity(userId, Number(activitiesId));
    return res.status(httpStatus.CREATED).send(createdActivity);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
  }
}
