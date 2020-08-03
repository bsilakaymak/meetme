"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_controller_1 = require("../../controller/auth-controller");
const router = express_1.default.Router();
// @route    POST api/auth/login
// @desc     Login
// @access   Public
router.post('/login', [
    express_validator_1.check('email', 'Please include a valid email').isEmail(),
    express_validator_1.check('password', 'Password is required').exists(),
], auth_controller_1.login);
// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', [
    express_validator_1.check('name', 'Name is required').not().isEmpty(),
    express_validator_1.check('email', 'Please include a valid email').isEmail(),
    express_validator_1.check('password', 'please enter password with 6 or more characters').isLength({ min: 6 }),
], auth_controller_1.register);
// @route    GET api/auth/me
// @desc     get current user
// @access   private
router.get('/me', auth_1.default, auth_controller_1.getCurrentUser);
module.exports = router;
