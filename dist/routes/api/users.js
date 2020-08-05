"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../../controller/usersControllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
/// @route   GET api/users
// @desc     get all user
// @access   private
router.get('/', auth_1.default, usersControllers_1.getUsers);
// @route    GET api/users
// @desc     GET User
// @access   Private
router.get('/:user_id', auth_1.default, usersControllers_1.getUserById);
// @route    DELETE api/users
// @desc     DELETE User + Meetings
// @access   Private
router.delete('/:user_id', auth_1.default, usersControllers_1.deleteUser);
module.exports = router;
