const fs = require('fs');
const Photo = require('../models/Photo');
const AsyncManager = require('../utils/asyncManager');
const MiniProjetError = require('../utils/MiniProjetError');

// $-title   Get all photos
// $-path    GET /api/v1/photos
// $-auth    Public
exports.getAllPhoto = AsyncManager(async (req, res, next) => {
  const photos = await Photo.find().populate('user', { firstName: 1, lastName: 1 });

  return res.status(200).json(photos);
});

// $-title   Get Single photo
// $-path    GET /api/v1/photos/:id
// $-auth    Public
exports.getPhoto = AsyncManager(async (req, res, next) => {
  const photo = await Photo.findById(req.params.id).populate('user', { firstName: 1, lastName: 1 });

  if (!photo) {
    return next(new MiniProjetError(`That photo is not available`, 404));
  }
  return res.status(200).json(photo);
});

// $-title   Update photo
// $-path    PATCH /api/v1/photos/:id
// $-auth    Public
exports.updatePhoto = AsyncManager(async (req, res, next) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    return next(new MiniProjetError(`That photo is not available`, 404));
  }
  if (!req.file) {
    return next(new MiniProjetError(`Photo is required`, 400));
  }
  fs.unlinkSync(`./uploads/${photo.name}`);
  const newPhoto = await Photo.findByIdAndUpdate(
    req.params.id,
    {
      url: `/uploads/${req.file.filename}`,
      name: req.file.filename,
    },
    { new: true, runValidators: true },
  ).populate('user', { firstName: 1, lastName: 1 });
  return res.status(200).json(newPhoto);
});

// $-title   Delete photo
// $-path    DELETE /api/v1/photos/:id
// $-auth    Public
exports.deletePhoto = AsyncManager(async (req, res, next) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    return next(new MiniProjetError(`That photo is not available`, 404));
  }
  fs.unlinkSync(`./uploads/${photo.name}`);
  await photo.remove();
  return res.status(200).json({ message: 'The photo has been deleted' });
});
