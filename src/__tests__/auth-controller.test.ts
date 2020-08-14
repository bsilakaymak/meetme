import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app";
import User from "../models/User";
import connectDB from "../config/db";

dotenv.config();
const secretJWT: string = process.env.jwtSecret!;

export const userOneId = new mongoose.Types.ObjectId();

export const userOne = {
  _id: userOneId,
  name: "Rab",
  email: "test@rabtest.com",
  password: "@#HOI!!",
  token: jwt.sign({ _id: userOneId }, secretJWT),
};

describe("Auth Controller", () => {
  beforeAll((done) => {
    connectDB()
      .then(done)
      .catch((err) => {
        throw err;
      });
  });

  beforeEach(async () => {
    await expect(User.deleteMany({})).resolves.toBeTruthy();
    await new User(userOne).save(); // keep one user in the DB for extra tests!
  });

  test("Should sign up a new user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "testRab123",
        email: "testRab123@test.com",
        password: "Password2123",
      })
      .expect(201);
  });

  test("Should throw 400 without password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "testRab123",
        email: "testRab123@test.com",
      })
      .expect(400);
  });

  test("Should not login with bad credentials", async () => {
    await request(app)
      .post("/api/auth/login")
      .send({
        email: userOne.email,
        password: "...",
      })
      .expect(401);
  });

  test("Should get the current user profile", async () => {
    await request(app)
      .get("/api/auth/me")
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(200);
  });
});
