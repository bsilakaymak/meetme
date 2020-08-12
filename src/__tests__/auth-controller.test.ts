import request from "supertest";
import app from "../app";
import User from "../models/User";

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
};

beforeEach(async () => {
  await User.deleteMany({});
});

test("Should sign up a new user", async () => {
  await request(app)
    .post("/register")
    .send({
      name: "testRab123",
      email: "testRab123@test.com",
      password: "Password2123",
    })
    .expect(201);
});
