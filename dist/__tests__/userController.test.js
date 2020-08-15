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
const auth_controller_test_1 = require("./auth-controller.test");
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
        yield new User_1.default(auth_controller_test_1.userOne).save();
    }));
    test("Should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .get("/api/users")
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send()
            .expect(200);
    }));
    test("Should get a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get(`/api/users/${auth_controller_test_1.userOne._id}`)
            .set("x-auth-token", `${auth_controller_test_1.userOne.token}`)
            .send()
            .expect(200);
        const user = yield User_1.default.findById(response.body._id);
        expect(response.body._id).not.toBe(null);
    }));
});
