import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, listDateActivities } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listDateActivities)
  .get("/:dateId", getActivities);

export { activitiesRouter };
