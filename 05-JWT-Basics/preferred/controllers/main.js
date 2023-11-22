const { BadRequest, Unauthenticated } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    throw new BadRequest("Please provide email and password");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequest("Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  res.status(200).json({ msg: "user created", newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Unauthenticated("Invalid username or password");
  }

  const id = user._id;
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); // TODO: what kind of data need to be used in the token (password or id)?

  res.status(200).json({ msg: "user login", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
  signup,
};
