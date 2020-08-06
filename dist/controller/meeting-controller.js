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
exports.inviteToMeeting = exports.getMeeting = exports.deleteMeeting = exports.getAllMeetings = exports.createMeeting = void 0;
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
        start: new Date(start),
        end: new Date(end),
        creator: req.userId,
        participants: [req.userId],
    });
    yield meeting.save();
    res.json(meeting);
    try {
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: 'Server Error!' } });
    }
});
exports.createMeeting = createMeeting;
const getAllMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetings = yield Meeting_1.default.find({
            creator: req.userId,
        }).sort('createdAt -1');
        res.json(meetings);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: 'Server Error!' } });
    }
});
exports.getAllMeetings = getAllMeetings;
const getMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mId = req.params.mId;
    try {
        const meeting = yield Meeting_1.default.findById(mId);
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: 'There is no meeting' }] });
        }
        res.json(meeting);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: 'Server Error!' } });
    }
});
exports.getMeeting = getMeeting;
const inviteToMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mId = req.params.mId;
    try {
        const meeting = yield Meeting_1.default.findById(mId);
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: 'There is no meeting' }] });
        }
        const newParticipants = [...meeting.participants, req.body.participants];
        meeting.participants = [...new Set(newParticipants)];
        // somewhere here we would call the function to send email to the relevant users via sendgrid or some other library
        // again somewhere here we need to establish a relationship between users and meetings, so we would make sure each user invited would have
        // this meeting on their meetings list
        yield meeting.save();
        res.json({ msg: `Users are invited to the meeting` });
    }
    catch (error) {
        res.status(500).json({ errors: { msg: 'Server Error!' } });
    }
});
exports.inviteToMeeting = inviteToMeeting;
const deleteMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mId = req.params.mId;
    try {
        const meeting = yield Meeting_1.default.findById(mId);
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: 'There is no meeting' }] });
        }
        yield meeting.remove();
        res.json({ msg: `${meeting.title} meeting deleted` });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: 'Server Error!' } });
    }
});
exports.deleteMeeting = deleteMeeting;
