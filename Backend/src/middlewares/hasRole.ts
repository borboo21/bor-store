import { NextFunction, Request, Response } from "express";

export function hasRole(roles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        res.send({ error: "Access denied" });

        return;
      }

      next();
    }
  };
}
