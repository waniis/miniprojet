const _ = require('lodash');
const fs = require('fs');
const User = require('../models/User');
const Photo = require('../models/Photo');
const AsyncManager = require('../utils/asyncManager');
const MiniProjetError = require('../utils/MiniProjetError');

// $-title   Create user
// $-path    POST /api/v1/users
// $-auth    Public

exports.createUser = AsyncManager(async (req, res, next) => {
  const data = _.omit(req.body, 'photo');
  const user = new User(data);
  if (req.file) {
    if (user.validateSync() && user.validateSync().errors) {
      fs.unlinkSync(`./uploads/${req.file.filename}`);
    } else {
      await Photo.create({
        url: `/uploads/${req.file.filename}`,
        name: req.file.filename,
        user: user._id,
      });
    }
  }

  return res.status(201).json(await user.save());
});

// $-title   Get all users
// $-path    GET /api/v1/users
// $-auth    Public
exports.getAllUsers = AsyncManager(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json(users);
});

// $-title   Get Single User
// $-path    GET /api/v1/users/:id
// $-auth    Public
exports.getUser = AsyncManager(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new MiniProjetError(`That user is not available`, 404));
  }
  return res.status(200).json(user);
});

// $-title   Update user
// $-path    PATCH /api/v1/users/:id
// $-auth    Public
exports.updateUser = AsyncManager(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new MiniProjetError(`That user is not available`, 404));
  }

  user = await User.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json(user);
});

// $-title   Delete User
// $-path    DELETE /api/v1/users/:id
// $-auth    Public
exports.deleteUser = AsyncManager(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new MiniProjetError(`That user is not available`, 404));
  }
  await user.remove();
  const photo = await Photo.findOne({ user: user._id });
  if (photo) {
    fs.unlinkSync(`./uploads/${photo.name}`);
    await photo.remove();
  }
  return res.status(200).json({ message: 'The user has been deleted' });
});
