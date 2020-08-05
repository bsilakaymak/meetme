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
exports.createMeeting = void 0;
const express_validator_1 = require("express-validator");
const Meeting_1 = __importDefault(require("../models/Meeting"));
const createMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, start, end } = req.body;
    const meeting = new Meeting_1.default({
        title,
        description,
        start,
        end,
        creator: req.userId,
    });
    yield meeting.save();
    try {
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: "Server Error!" } });
    }
});
exports.createMeeting = createMeeting;
