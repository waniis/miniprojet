const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a firstName'],
      maxlength: [30, "FirstName can't be more than 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a lastName'],
      maxlength: [30, "LastName can't be more than 30 characters"],
    },
    gender: {
      type: String,
      required: [true, 'Please add a gender'],
      enum: ['Male', 'Female'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      maxlength: [100, "address can't be more than 100 characters"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add the date of birth'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
