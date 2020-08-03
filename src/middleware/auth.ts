import * as express from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.jsonwebtoken!;

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token' }] });
  }

  try {
    const decoded: string | object = jwt.verify(token, secretJWT);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
}
