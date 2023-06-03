const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  //validators
  if (!email || !password) {
    throw Error('All fields are required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  //check if email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashPassword });
  return user;
};

userSchema.statics.login = async function (email, password) {
  //validators
  if (!email || !password) {
    throw Error('All fields are required');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
