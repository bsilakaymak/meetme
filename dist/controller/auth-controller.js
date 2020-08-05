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
exports.getCurrentUser = exports.register = exports.login = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretJWT = process.env.jwtSecret;
// Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        // If user exists
        const emailEx = yield User_1.default.findOne({ email });
        if (emailEx) {
            return res.status(400).json({ errors: [{ msg: "UserAlready exists" }] });
        }
        // create user
        const user = new User_1.default({
            name,
            email,
            password,
        });
        // encrypt password
        const slat = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, slat);
        yield user.save();
        // return JWT
        const payload = {
            id: user.id,
        };
        jsonwebtoken_1.default.sign(payload, secretJWT, { expiresIn: "10d" }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    }
});
exports.register = register;
// login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // See if user exists
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        // If there is a user check his hashed password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        // Return JWT
        const payload = {
            id: user.id,
        };
        jsonwebtoken_1.default.sign(payload, secretJWT, { expiresIn: "1h" }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.login = login;
// get current user
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req);
    try {
        const user = yield User_1.default.findById(req.userId).select("-password");
        // console.log(req);
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.getCurrentUser = getCurrentUser;
