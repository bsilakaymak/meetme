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
exports.MeetingOne = exports.userOne = exports.setupDatabase = exports.userOneId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../../models/User"));
const Meeting_1 = __importDefault(require("../../models/Meeting"));
dotenv_1.default.config();
const secretJWT = process.env.jwtSecret;
const userOneId = new mongoose_1.default.Types.ObjectId();
exports.userOneId = userOneId;
const userOne = {
    _id: userOneId,
    name: "Rab",
    email: "test@rabtest.com",
    password: "@#HOI!!",
    token: jsonwebtoken_1.default.sign({ _id: userOneId }, secretJWT),
};
exports.userOne = userOne;
const MeetingOne = {
    title: "Testing",
    description: "Testing ",
    start: "2020-08-11T16:47:38.629+00:00",
    end: "2020-08-11T16:47:38.629+00:00",
    creator: userOne._id,
    address: "Utrecht",
};
exports.MeetingOne = MeetingOne;
const setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany({});
    yield Meeting_1.default.deleteMany({});
    yield new User_1.default(userOne).save();
    yield new Meeting_1.default(MeetingOne).save();
});
exports.setupDatabase = setupDatabase;
