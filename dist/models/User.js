"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        unique: true,
    },
    meetings: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Meeting",
        },
    ],
    avatar: {
        type: String,
    },
});
exports.default = mongoose_1.model("User", userSchema);
