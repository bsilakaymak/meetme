const request = require("supertest");
const app = require("../app");
// import User from "../models/User";

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
