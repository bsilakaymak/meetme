"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_js_1 = __importDefault(require("./config/db.js"));
db_js_1.default();
console.log("test from server");
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => console.log(`Server started on port ${PORT}`));
