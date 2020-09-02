"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    meeting: {
        type: mongoose_1.Types.ObjectId,
        ref: "Meeting",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("Note", NoteSchema);
