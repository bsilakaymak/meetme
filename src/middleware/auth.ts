import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export interface IPayload {
  id: string;
}

const secretJWT: string = process.env.jwtSecret!;

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | undefined {
  const token: string | undefined = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No token" }] });
  }

  try {
    const payload = jwt.verify(token, secretJWT) as IPayload;
    req.userId = payload.id;

    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
}
