const express = require('express');
const upload = require('../utils/uploadImage');
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/users').get(getAllUsers).post(upload.single('photo'), createUser);
router
  .route('/users/:id')
  .patch(upload.single('photo'), updateUser)
  .delete(deleteUser)
  .get(getUser);
module.exports = router;
