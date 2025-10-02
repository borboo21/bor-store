import type { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helpers/token.ts";
import { UserModel } from "../models/User.ts";

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
