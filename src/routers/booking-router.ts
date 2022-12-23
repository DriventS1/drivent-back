import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getRoomBookings } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", getRoomBookings)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
