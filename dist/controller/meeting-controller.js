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
exports.updateMeeting = exports.inviteToMeeting = exports.getMeeting = exports.deleteMeeting = exports.getAllMeetings = exports.createMeeting = void 0;
const express_validator_1 = require("express-validator");
const Meeting_1 = __importDefault(require("../models/Meeting"));
const User_1 = __importDefault(require("../models/User"));
const account_1 = require("../emails/account");
const createMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, start, end, address } = req.body;
    const meeting = new Meeting_1.default({
        title,
        description,
        start: new Date(start),
        end: new Date(end),
        creator: req.userId,
        participants: [req.userId],
        address,
    }).populate({
        path: "participants",
        select: "name email avatar _id",
    });
    const user = yield User_1.default.findById(req.userId);
    user === null || user === void 0 ? void 0 : user.meetings.push(meeting._id);
    yield (user === null || user === void 0 ? void 0 : user.save());
    yield meeting.save();
    res.status(201).json(meeting);
    try {
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: "Server Error!" }] });
    }
});
exports.createMeeting = createMeeting;
const getAllMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetings = yield Meeting_1.default.find({
            $or: [{ creator: req.userId }, { participants: req.userId }],
        })
            .populate({
            path: "participants",
            select: "name email avatar _id",
        })
            .sort({ createdAt: -1 });
        res.status(200).json(meetings);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: "Server Error!" }] });
    }
});
exports.getAllMeetings = getAllMeetings;
const getMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mId = req.params.mId;
    try {
        const meeting = yield Meeting_1.default.findById(mId).populate({
            path: "participants",
            select: "name email avatar _id",
        });
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
        }
        res.status(200).json(meeting);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
        }
        res.status(500).json({ errors: [{ msg: "Server Error!" }] });
    }
});
exports.getMeeting = getMeeting;
const inviteToMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mId = req.params.mId;
    try {
        const meeting = yield Meeting_1.default.findById(mId);
        const sender = yield User_1.default.findById(req.userId);
        if (sender &&
            meeting &&
            sender._id.toString() !== meeting.creator.toString()) {
            return res.status(401).json({
                errors: [{ msg: "Only the creator can send an invitation " }],
            });
        }
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
        }
        req.body.participants.map((participant) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email: participant });
            if (!user) {
                return res.status(400).json({
                    errors: [
                        { msg: `The user with this ${participant} email is not exists ` },
                    ],
                });
            }
            if (user !== null) {
                if (meeting.participants.includes(user._id) && (user === null || user === void 0 ? void 0 : user.meetings.includes(mId)) && (sender === null || sender === void 0 ? void 0 : sender.meetings.includes(mId))) {
                    res.status(400).json({
                        errors: [
                            { msg: `The user with this ${user.email} is already invited!` },
                        ],
                    });
                }
                else {
                    meeting.participants.push(user._id);
                    user.meetings.push(mId);
                    yield meeting.save();
                    yield user.save();
                    res.status(201).json(meeting.participants);
                }
            }
        }));
        if (sender !== null) {
            account_1.invitationNotificationEmail(meeting.title, req.body.participants, sender.name);
        }
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
        }
        res.status(500).json({ errors: [{ msg: "Server Error!" }] });
    }
});
exports.inviteToMeeting = inviteToMeeting;
const deleteMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mId = req.params.mId;
    try {
        const meeting = yield Meeting_1.default.findById(mId);
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
        }
        meeting.participants.forEach((p) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.default.findById(p);
            if (user !== null) {
                const removeIndex = user === null || user === void 0 ? void 0 : user.meetings.map((meeting) => meeting).indexOf(mId);
                user.meetings.splice(removeIndex, 1);
                yield user.save();
            }
        }));
        yield meeting.remove();
        res.status(202).json({ msg: `${meeting.title} meeting deleted` });
    }
    catch (error) {
        if (error.kind === "ObjectId") {
            res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
        }
        res.status(500).json({ errors: [{ msg: "Server Error!" }] });
    }
});
exports.deleteMeeting = deleteMeeting;
const updateMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const mId = req.params.mId;
    const updates = Object.keys(req.body);
    try {
        const meeting = yield Meeting_1.default.findById(mId).populate({
            path: "participants",
            select: "name email avatar _id",
        });
        if (!meeting) {
            return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
        }
        updates.forEach((update) => (meeting[update] = req.body[update]));
        yield meeting.save();
        res.status(201).json(meeting);
    }
    catch (error) {
        if (error.kind === "ObjectId") {
            res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
        }
        res.status(500).json({ errors: [{ msg: "Server Error!" }] });
        console.error(error.message);
    }
});
exports.updateMeeting = updateMeeting;
