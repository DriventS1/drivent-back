import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listDateActivities, bookingActivity } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listDateActivities)
  .post("", bookingActivity);
//   .get("/:roomId", getRoomBookings)
//   .put("/:bookingId", changeBooking);

export { activitiesRouter };
 
