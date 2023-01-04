import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listDateActivities } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listDateActivities);
//   .get("/:roomId", getRoomBookings)
//   .post("", bookingRoom)
//   .put("/:bookingId", changeBooking);

export { activitiesRouter };
