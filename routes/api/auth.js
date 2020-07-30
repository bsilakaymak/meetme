const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const { login, register, getCurrentUser } = require('../../controller/auth-controller');

const User = require('../../models/User');

// @route    POST api/auth/login
// @desc     Login
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// @route    POST api/auth/signup
// @desc     Register user
// @access   Public
router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

// @route    GET api/auth/me
// @desc     get current user
// @access   private
router.get('/me', auth, getCurrentUser);

module.exports = router;
