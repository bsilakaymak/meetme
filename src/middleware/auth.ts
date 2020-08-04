import * as express from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const secretJWT = process.env.jsonwebtoken!;
// @Todo Ali change the auth function parameter default type with typescript
export default function (req: any, res: any, next: express.NextFunction) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No token" }] });
  }

  try {
    const decoded: any = jwt.verify(token, secretJWT);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
}
