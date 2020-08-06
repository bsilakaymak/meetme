import express from 'express';
import { getUsers, getUserById } from '../../controller/usersControllers';
import auth from '../../middleware/auth';

const router = express.Router();

/// @route   GET api/users
// @desc     get all user
// @access   private
router.get('/', auth, getUsers);

// @route    GET api/users
// @desc     GET User
// @access   Private
router.get('/:user_id', auth, getUserById);

module.exports = router;
