import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listDateActivities, bookingActivity, getActivities } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listDateActivities)
  .post("", bookingActivity)
  .get("/:dateId", getActivities);

export { activitiesRouter };
 
