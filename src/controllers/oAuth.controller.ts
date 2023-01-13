import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService from "@/services/authentication-service";

export async function oAuthSignIn(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const result = await authenticationService.signInWithGitHub({ email });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }  
}
