"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const Meeting_1 = __importDefault(require("../models/Meeting"));
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../config/db"));
const auth_controller_test_1 = require("./auth-controller.test");
const mongoose_1 = require("mongoose");
const MeetingOne = {
    _id: mongoose_1.Types.ObjectId(),
    title: "Testing",
    description: "Testing ",
    start: "2020-08-11T16:47:38.629+00:00",
    end: "2020-08-11T16:47:38.629+00:00",
    creator: auth_controller_test_1.userOneId,
    address: "Utrecht",
    participants: [auth_controller_test_1.userOneId],
};
describe("Meeting Controller", () => {
    beforeAll((done) => {
        db_1.default()
            .then(done)
            .catch((err) => {
            throw err;
        });
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(Meeting_1.default.deleteMany({})).resolves.toBeTruthy();
        yield new Meeting_1.default(MeetingOne).save(); // keep one Meeting in the DB for extra tests!
    }));
    test("Should create a meeting for the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post("/api/meeting")
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send({
            title: "Testing one",
            description: "Testing ",
            start: "2020-08-11T16:47:38.629+00:00",
            end: "2020-08-11T16:47:38.629+00:00",
            address: "Utrecht",
            creator: auth_controller_test_1.userOneId,
            participants: [auth_controller_test_1.userOneId],
        })
            .expect(201);
        const meeting = yield Meeting_1.default.findById(response.body._id);
        expect(meeting).not.toBe(null);
    }));
    test("Should do not create a task for the user if the user in not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post("/api/meeting")
            .send({
            title: "Testing one",
            description: "Testing ",
            start: "2020-08-11T16:47:38.629+00:00",
            end: "2020-08-11T16:47:38.629+00:00",
            address: "Utrecht",
            creator: auth_controller_test_1.userOneId,
        })
            .expect(401);
    }));
    test("Should get all meeting for specific user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .get(`/api/meeting`)
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send()
            .expect(200);
        const meeting = yield Meeting_1.default.find({ creator: auth_controller_test_1.userOneId });
        expect(meeting).not.toBe(null);
    }));
    test("Should get meeting by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get(`/api/meeting/${MeetingOne._id}`)
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send()
            .expect(200);
        const meeting = yield Meeting_1.default.findById(response.body._id);
        expect(meeting).not.toBe(null);
    }));
    test("Should update meeting by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .patch(`/api/meeting/${MeetingOne._id}`)
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send({
            title: "test meeting update",
            description: "I will finish the update testing",
            start: "2020-09-11T16:47:38.629+00:00",
            end: "2020-01-11T16:47:38.629+00:00",
            address: "amsterdam",
        })
            .expect(201);
        const meeting = yield Meeting_1.default.findById(response.body._id);
        expect(meeting).not.toBe(null);
    }));
    test("Should delete meeting by id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .delete(`/api/meeting/${MeetingOne._id}`)
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send()
            .expect(202);
    }));
    test("Should invite people to the meeting ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .put(`/api/meeting/${MeetingOne._id}/participants`)
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send({
            participants: ["aboal7anan@gmail.com"],
        })
            .expect(201);
    }));
});
