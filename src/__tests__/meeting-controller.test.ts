import request from "supertest";
import Meeting from "../models/Meeting";
import app from "../app";
import connectDB from "../config/db";
import { userOne, userOneId } from "./auth-controller.test";
import { Types } from "mongoose";

const MeetingOne = {
  _id: Types.ObjectId(),
  title: "Testing",
  description: "Testing ",
  start: "2020-08-11T16:47:38.629+00:00",
  end: "2020-08-11T16:47:38.629+00:00",
  creator: userOneId,
  address: "Utrecht",
  participants: [userOneId],
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

  test("Should create a meeting for the user", async () => {
    const response = await request(app)
      .post("/api/meeting")
      .set("x-auth-token", `${userOne.token}`)
      .send({
        title: "Testing one",
        description: "Testing ",
        start: "2020-08-11T16:47:38.629+00:00",
        end: "2020-08-11T16:47:38.629+00:00",
        address: "Utrecht",
        creator: userOneId,
        participants: [userOneId],
      })
      .expect(201);
    const meeting = await Meeting.findById(response.body._id);

    expect(meeting).not.toBe(null);
  });

  test("Should do not create a task for the user if the user in not authenticated", async () => {
    await request(app)
      .post("/api/meeting")
      .send({
        title: "Testing one",
        description: "Testing ",
        start: "2020-08-11T16:47:38.629+00:00",
        end: "2020-08-11T16:47:38.629+00:00",
        address: "Utrecht",
        creator: userOneId,
      })
      .expect(401);
  });

  test("Should get all meeting for specific user", async () => {
    await request(app)
      .get(`/api/meeting`)
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(200);

    const meeting = await Meeting.find({ creator: userOneId });

    expect(meeting).not.toBe(null);
  });

  test("Should get meeting by id", async () => {
    const response = await request(app)
      .get(`/api/meeting/${MeetingOne._id}`)
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(200);

    const meeting = await Meeting.findById(response.body._id);
    expect(meeting).not.toBe(null);
  });
  test("Should update meeting by id", async () => {
    const response = await request(app)
      .patch(`/api/meeting/${MeetingOne._id}`)
      .set("x-auth-token", `${userOne.token}`)
      .send({
        title: "test meeting update",
        description: "I will finish the update testing",
        start: "2020-09-11T16:47:38.629+00:00",
        end: "2020-01-11T16:47:38.629+00:00",
        address: "amsterdam",
      })
      .expect(201);

    const meeting = await Meeting.findById(response.body._id);

    expect(meeting).not.toBe(null);
  });
  test("Should delete meeting by id", async () => {
    await request(app)
      .delete(`/api/meeting/${MeetingOne._id}`)
      .set("x-auth-token", `${userOne.token}`)
      .send()
      .expect(202);
  });
  test("Should invite people to the meeting ", async () => {
    await request(app)
      .put(`/api/meeting/${MeetingOne._id}/participants`)
      .set("x-auth-token", `${userOne.token}`)
      .send({
        participants: ["aboal7anan@gmail.com"],
      })
      .expect(201);
  });
});
