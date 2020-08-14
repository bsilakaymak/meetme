import request from "supertest";
import Meeting from "../models/Meeting";
import app from "../app";
import connectDB from "../config/db";
import { userOne, userOneId } from "./auth-controller.test";

const MeetingOne = {
  title: "Testing",
  description: "Testing ",
  start: "2020-08-11T16:47:38.629+00:00",
  end: "2020-08-11T16:47:38.629+00:00",
  creator: userOne._id,
  address: "Utrecht",
};

describe("Meeting Controller", () => {
  beforeAll((done) => {
    connectDB()
      .then(done)
      .catch((err) => {
        throw err;
      });
  });

  beforeEach(async () => {
    await expect(Meeting.deleteMany({})).resolves.toBeTruthy();
    await new Meeting(MeetingOne).save(); // keep one Meeting in the DB for extra tests!
  });

  test("Should create task for user", async () => {
    await request(app)
      .post("/api/meeting")
      .set("x-auth-token", `${userOne.token}`)
      .send({
        title: "Testing one",
        description: "Testing ",
        start: "2020-08-11T16:47:38.629+00:00",
        end: "2020-08-11T16:47:38.629+00:00",
        address: "Amsterdam",
        creator: userOneId,
      })
      .expect(201);
  });
});
