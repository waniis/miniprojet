const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, './uploads/');
  },
  filename: function (req, file, next) {
    next(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, next) => {
  // reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    next(null, true);
  } else {
    next(null, false);
    return next(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
