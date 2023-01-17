import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import httpStatus from "http-status";
import supertest from "supertest";
import { createEvent, createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /users/auth/sign-in", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users/auth/sign-in");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users/auth/sign-in").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    const generateGitHubValidBody = () => ({
      email: faker.internet.email()
    });

    it("should respond with status 400 when there is no event", async () => {
      const body = generateValidBody();

      const response = await server.post("/users/auth/sign-in").send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when current event did not started yet", async () => {
      const event = await createEvent({ startsAt: dayjs().add(1, "day").toDate() });
      const body = generateValidBody();

      const response = await server.post("/users/auth/sign-in").send(body).query({ eventId: event.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when event started", () => {
      beforeAll(async () => {
        await prisma.event.deleteMany({});
        await createEvent();
      });

      it("should respond with status 200 and sign-in when there is an user with given email", async () => {
        const body = generateGitHubValidBody();
        await createUser(body);

        const response = await server.post("/users/auth/sign-in").send(body);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          user: {
            id: expect.any(Number),
            email: body.email
          },
          token: expect.any(String)
        });
      });

      it("should respond with status 200 and create user when given email doesnt sign-up yet", async () => {
        const body = generateGitHubValidBody();

        const response = await server.post("/users/auth/sign-in").send(body);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          user: {
            id: expect.any(Number),
            email: body.email
          },
          token: expect.any(String)
        });
      });

      it("should not return user password on body", async () => {
        const body = generateValidBody();

        const response = await server.post("/users/auth/sign-in").send(body);

        expect(response.body).not.toHaveProperty("password");
      });

      it("should save user on db", async () => {
        const body = generateValidBody();

        const response = await server.post("/users").send(body);

        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });
        expect(user).toEqual(
          expect.objectContaining({
            id: response.body.id,
            email: body.email,
          }),
        );
      });
    });
  });
});
