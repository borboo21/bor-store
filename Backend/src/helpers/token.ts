import jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const DEFAULT_EXPIRES_IN: SignOptions = { expiresIn: "30d" };

export const jwtHelper = {
  generate(data: JwtPayload): string {
    return jwt.sign(data, JWT_SECRET, DEFAULT_EXPIRES_IN);
  },
  verify(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  },
};
