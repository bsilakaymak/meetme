"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../../middleware/auth"));
const note_controller_1 = require("../../controller/note-controller");
const router = express_1.default.Router();
router.get("/meetings/:mId", auth_1.default, note_controller_1.getNotes);
router.delete("/:nId/meetings/:mId", auth_1.default, note_controller_1.deleteNote);
router.post("/meetings/:mId", auth_1.default, [express_validator_1.check("title", "Title is required").not().isEmpty()], note_controller_1.addNote);
module.exports = router;
