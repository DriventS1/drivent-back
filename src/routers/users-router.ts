import { Router } from "express";

import { createUserSchema, createUserGitHubSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { usersPost, getGitHubUser } from "@/controllers";
import { oAuthSignIn } from "@/controllers/oAuth.controller";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersPost);
usersRouter.post("/auth", getGitHubUser);
usersRouter.post("/auth/sign-in", oAuthSignIn);

export { usersRouter };
