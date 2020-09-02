"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../../middleware/auth"));
const meeting_controller_1 = require("../../controller/meeting-controller");
const router = express_1.default.Router();
// @route    POST api/meeting
// @desc     Create meeting
// @access   Private
router.put("/:mId/participants", auth_1.default, meeting_controller_1.inviteToMeeting);
router.post("/", auth_1.default, [
    express_validator_1.check("title", "Title is required").not().isEmpty(),
    express_validator_1.check("start", "Start is required").not().isEmpty(),
    express_validator_1.check("end", "End is required").not().isEmpty(),
    express_validator_1.check("address", "Address is required").not().isEmpty(),
], meeting_controller_1.createMeeting);
router.patch("/:mId", auth_1.default, [
    express_validator_1.check("title", "Title is required").not().isEmpty(),
    express_validator_1.check("start", "Start is required").not().isEmpty(),
    express_validator_1.check("end", "End is required").not().isEmpty(),
    express_validator_1.check("address", "Address is required").not().isEmpty(),
], meeting_controller_1.updateMeeting);
router.get("/", auth_1.default, meeting_controller_1.getAllMeetings);
router.get("/:mId", auth_1.default, meeting_controller_1.getMeeting);
router.delete("/:mId", auth_1.default, meeting_controller_1.deleteMeeting);
module.exports = router;
