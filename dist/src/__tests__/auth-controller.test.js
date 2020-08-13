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
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../config/db"));
const userOne = {
    name: "Mike",
    email: "mike@example.com",
    password: "56what!!",
};
describe("Auth Controller", () => {
    beforeAll((done) => {
        db_1.default()
            .then(done)
            .catch((err) => {
            throw err;
        });
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(User_1.default.deleteMany({})).resolves.toBeTruthy();
    }));
    test("Should sign up a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post("/api/auth/register")
            .send({
            name: "testRab123",
            email: "testRab123@test.com",
            password: "Password2123",
        })
            .expect(201);
    }));
    test("Should throw 400 without password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post("/api/auth/register")
            .send({
            name: "testRab123",
            email: "testRab123@test.com",
        })
            .expect(400);
    }));
});
