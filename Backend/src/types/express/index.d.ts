import express from "express";
import { User } from "Backend/src/models/User";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
