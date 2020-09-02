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
exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select("-password");
        if (!users) {
            return res.status(404).json({
                errors: [{ msg: "No Users Found" }],
            });
        }
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.getUsers = getUsers;
// Get user by Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    try {
        const user = yield User_1.default.findById(user_id).select("-password");
        if (!user)
            return res.status(404).json({ msg: "Profile not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.getUserById = getUserById;
