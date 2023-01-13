import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import axios from "axios";

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getGitHubUser(req: Request, res: Response) {
  const { codeParam } = req.body;
  if(codeParam !== null) {
    try {
      const token = await exchangeCodeForAccessToken(codeParam);
      const userData = await fetchUser(token);
      const email = userData.email;
      
      return res.status(httpStatus.OK).send(email);
    } catch (error) {
      if(error.name === "DuplicatedEmailError") {
        return res.sendStatus(httpStatus.CONFLICT);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
  
async function exchangeCodeForAccessToken(code: string) {
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  const PARAMS = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`; 
  const GITHUB_ACCESS_TOKEN_URL = `https://github.com/login/oauth/access_token${PARAMS}`;
  
  const body = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
    
  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, body, {
    headers: {
      "Content_Type": "application_json"
    }
  });
  
  const urlParam = new URLSearchParams(`?${data}`);
  const token = urlParam.get("access_token");
  return token;
}
  
async function fetchUser(token: string) {
  const response = await axios.get("http://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response.data;
}
