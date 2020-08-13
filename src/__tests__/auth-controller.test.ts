import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app";
import User from "../models/User";
import connectDB from "../config/db";

dotenv.config();
const secretJWT: string = process.env.jwtSecret!;

const userOneId = new mongoose.Types.ObjectId();

export const userOne = {
  _id: userOneId,
  name: "Rab",
  email: "test@rabtest.com",
  password: "@#HOI!!",
  // store token in the test-DB in order to test login
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

  test("Should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "testRab123",
        email: "testRab123@test.com",
        password: "Password2123",
        company: "company name",
      })
      .expect(201);

    // Assertion that the user has been added to the DB.
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBe(null);

    // Assertion that response body has name value
    expect(response.body).toMatchObject({
      user: {
        name: "testRab123",
      },
    });

    // Assertion that the password is hashed
    expect(response.body.user.password).not.toBe("Password2123");
  });

  test("Should throw 400 without providing a password", async () => {
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

  test("Should not get user profile if user not authenticated", async () => {
    await request(app).get("/api/auth/me").send().expect(401);
  });

  test("Should delete account if user is authenticated", async () => {
    await request(app)
      .delete("/api/auth/me")
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(200);
  });

  test("Should not delete account if user is NOT authenticated", async () => {
    await request(app).delete("/api/auth/me").send().expect(401);
  });
});
