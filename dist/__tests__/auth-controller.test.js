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
exports.userTwo = exports.userOne = exports.userTwoId = exports.userOneId = void 0;
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const secretJWT = process.env.jwtSecret;
exports.userOneId = new mongoose_1.default.Types.ObjectId();
exports.userTwoId = new mongoose_1.default.Types.ObjectId();
exports.userOne = {
    _id: exports.userOneId,
    name: "Rab",
    email: "test@rabtest.com",
    password: "@#HOI!!",
    // store token in the test-DB in order to test login
    token: jsonwebtoken_1.default.sign({ id: exports.userOneId }, secretJWT),
};
exports.userTwo = {
    _id: exports.userTwoId,
    name: "Ali",
    email: "aboal7anan@gmail.com",
    password: "test@()",
    // store token in the test-DB in order to test login
    token: jsonwebtoken_1.default.sign({ id: exports.userOneId }, secretJWT),
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
        yield new User_1.default(exports.userOne).save();
        yield new User_1.default(exports.userTwo).save();
    }));
    test("Should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post("/api/auth/register")
            .send({
            name: "testRab123",
            email: "testRab123@test.com",
            password: "Password2123",
            company: "company name",
        })
            .expect(201);
        // Assertion that the user has been added to the DB.
        expect(response.body.token).not.toBe(null);
    }));
    test("Should throw 400 without providing a password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post("/api/auth/register")
            .send({
            name: "testRab123",
            email: "testRab123@test.com",
        })
            .expect(400);
        expect(response.body.token).not.toBe(null);
    }));
    test("Should not login with bad credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post("/api/auth/login")
            .send({
            email: exports.userOne.email,
            password: "...",
        })
            .expect(401);
    }));
    test("Should get the current user profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get("/api/auth/me")
            .set("x-auth-token", `${exports.userOne.token}`)
            .send()
            .expect(200);
        const user = yield User_1.default.findById(response.body._id);
        expect(user).not.toBe(null);
    }));
    test("Should not get user profile if user not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).get("/api/auth/me").send().expect(401);
    }));
    test("Should delete account if user is authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .delete("/api/auth/me")
            .set("x-auth-token", `${exports.userOne.token}`)
            .send()
            .expect(200);
    }));
    test("Should not delete account if user is NOT authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default).delete("/api/auth/me").send().expect(401);
    }));
});
