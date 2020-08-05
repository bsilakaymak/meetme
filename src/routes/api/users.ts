import express from 'express';
import {
  getUsers,
  getUserById,
  deleteUser,
} from '../../controller/usersControllers';
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

// @route    DELETE api/users
// @desc     DELETE User + Meetings
// @access   Private
router.delete('/:user_id', auth, deleteUser);

module.exports = router;
