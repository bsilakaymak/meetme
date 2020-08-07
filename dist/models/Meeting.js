"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MeetingSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    participants: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("Meeting", MeetingSchema);
