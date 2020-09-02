"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretJWT = process.env.jwtSecret;
function default_1(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token" }] });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secretJWT);
        req.userId = payload.id;
        next();
    }
    catch (err) {
        res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
    }
}
exports.default = default_1;
