const express = require('express');
const {
  getAllPhoto,
  deletePhoto,
  getPhoto,
  updatePhoto,
} = require('../controllers/photoControllers');
const upload = require('../utils/uploadImage');

const router = express.Router();

router.route('/photos').get(getAllPhoto);
router
  .route('/photos/:id')
  .patch(upload.single('photo'), updatePhoto)
  .delete(deletePhoto)
  .get(getPhoto);
module.exports = router;
