import request from "supertest";
import app from "../app";
import User from "../models/User";
import connectDB from "../config/db";

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
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
});
