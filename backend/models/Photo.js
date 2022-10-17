const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Photo', PhotoSchema);
