const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Register a new user
//  /api/users
//  Public

const registeredUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // throw err if field is missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // exit if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPword,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

// login a new user
// /api/users/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("login Route");
});

module.exports = {
  registeredUser,
  loginUser,
};
