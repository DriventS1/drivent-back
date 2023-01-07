import app, { init } from "@/app";
import faker from "@faker-js/faker";
import { prisma, TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createPayment,
  generateCreditCardData,
  createTicketTypeWithHotel,
  createTicketTypeRemote,
  createHotel,
  createRoomWithHotelId,
  createBooking,
  createActivities
} from "../factories";
import { createDateActivity } from "../factories/activities-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 404 when user has no enrollment", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      await createTicketTypeRemote();

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 402 when user ticket has no 'PAID' ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createPayment(ticket.id, ticketType.price);
  
      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 200 and a list of event dates", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const createdHotel = await createHotel();
      const room = await createRoomWithHotelId(createdHotel.id);
      const booking = await createBooking({
        userId: user.id,
        roomId: room.id,
      });

      const dateActivities = await createDateActivity();
      
      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);

      expect(response.body).toEqual([
        {
          id: 1,
          date: "2023-01-16T02:12:42.501Z",
          createdAt: "2022-12-16T02:12:42.501Z",
          updatedAt: "2022-12-16T02:12:42.501Z",
        },
        {
          id: 2,
          date: "2023-01-17T02:12:42.501Z",
          createdAt: "2022-12-16T02:12:42.501Z",
          updatedAt: "2022-12-16T02:12:42.501Z",
        },
        {
          id: 3,
          date: "2023-01-18T02:12:42.501Z",
          createdAt: "2022-12-16T02:12:42.501Z",
          updatedAt: "2022-12-16T02:12:42.501Z",
        },
      ]);
    });

    it("should respond with status 200 and an empty array", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const createdHotel = await createHotel();
      const room = await createRoomWithHotelId(createdHotel.id);
      const booking = await createBooking({
        userId: user.id,
        roomId: room.id,
      });

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);

      expect(response.body).toEqual([]);
    });
  });
});

describe("POST /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/activities");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 201 and the created Booking Activity", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const createdHotel = await createHotel();
      const room = await createRoomWithHotelId(createdHotel.id);
      const booking = await createBooking({
        userId: user.id,
        roomId: room.id,
      });

      const dateActivities = await createDateActivity();
      const activities = await createActivities();
      //activitieId: 1
      const response = await server.post("/activities").set("Authorization", `Bearer ${token}`).send({ activitiesId: 1 });

      expect(response.statusCode).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: 1,
        name: "Palestra x",
        capacity: 35,
        dateId: 1,
        localId: 2,
        startsAt: "2022-12-16T02:10:00.501Z",
        endsAt: "2022-12-16T02:40:00.501Z"
      });
    });
  });
});
