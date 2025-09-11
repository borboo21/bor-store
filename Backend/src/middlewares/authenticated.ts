import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helpers/token";
import { UserModel } from "../models/User";

export async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenData = jwtHelper.verify(req.cookies.token);

  const user = await UserModel.findOne({ _id: tokenData.userId });

  if (!user) {
    res.send({ error: "Authenticated user not found" });
    return;
  }

  req.user = user;

  next();
}
