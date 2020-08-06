import express from "express";
import { check } from "express-validator";

import auth from "../../middleware/auth";
import {
  login,
  register,
  getCurrentUser,
} from "../../controller/auth-controller";

const router = express.Router();

// @route    POST api/auth/login
// @desc     Login
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "please enter password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  register
);

// @route    GET api/auth/me
// @desc     get current user
// @access   private
router.get("/me", auth, getCurrentUser);

module.exports = router;
