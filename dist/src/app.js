"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
// Parse incoming request bodies
app.use(express_1.default.json());
//Define Routes
app.use("/api/auth", require("./routes/api/auth"));
console.log("test from app.js");
app.use("/api/meeting", require("./routes/api/meeting"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/notes", require("./routes/api/note"));
exports.default = app;
