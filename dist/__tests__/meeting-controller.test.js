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
const MeetingOne = {
    title: "Testing",
    description: "Testing ",
    start: "2020-08-11T16:47:38.629+00:00",
    end: "2020-08-11T16:47:38.629+00:00",
    creator: auth_controller_test_1.userOne._id,
    address: "Utrecht",
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
    test("Should create task for user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post("/api/meeting")
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send({
            title: "Testing one",
            description: "Testing ",
            start: "2020-08-11T16:47:38.629+00:00",
            end: "2020-08-11T16:47:38.629+00:00",
            address: "Amsterdam",
            creator: auth_controller_test_1.userOneId,
        })
            .expect(201);
    }));
});
