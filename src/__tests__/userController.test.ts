import request from "supertest";
import app from "../app";
import User from "../models/User";
import connectDB from "../config/db";
import { userOne } from "./auth-controller.test";

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
    await new User(userOne).save();
  });

  test("Should get all users", async () => {
    await request(app)
      .get("/api/users")
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(200);
  });

  test("Should get a user by id", async () => {
    const response = await request(app)
      .get(`/api/users/${userOne._id}`)
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(200);

    const user = await User.findById(response.body._id);

    expect(response.body._id).not.toBe(null);
  });
});
