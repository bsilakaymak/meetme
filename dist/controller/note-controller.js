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
exports.deleteNote = exports.addNote = exports.getNotes = void 0;
const express_validator_1 = require("express-validator");
const Note_1 = __importDefault(require("../models/Note"));
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mId } = req.params;
    try {
        const notes = yield Note_1.default.find({ meeting: mId })
            .populate({
            path: "creator",
            select: "name email avatar _id",
        })
            .sort({ createdAt: -1 });
        if (!notes) {
            return res.status(404).json({ errors: [{ msg: "there is no notes" }] });
        }
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: "Server Error!" } });
    }
});
exports.getNotes = getNotes;
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mId } = req.params;
    const { title, description } = req.body;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Note_1.default({
            title,
            description,
            creator: req.userId,
            meeting: mId,
        }).populate({
            path: "creator",
            select: "name email avatar _id",
        });
        yield note.save();
        res.json(note);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: "Server Error!" } });
    }
});
exports.addNote = addNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mId, nId } = req.params;
    try {
        const note = yield Note_1.default.findOne({ meeting: mId, _id: nId });
        if (!note) {
            return res.status(404).json({ errors: [{ msg: "there is no notes" }] });
        }
        if (note.creator.toString() !== req.userId) {
            return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
        }
        yield note.remove();
        res.json({ msg: "Note deleted" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: { msg: "Server Error!" } });
    }
});
exports.deleteNote = deleteNote;
