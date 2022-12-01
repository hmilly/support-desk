const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Register a new user
//  /api/users
//  Public

const registerUser = asyncHandler(async (req, res) => {

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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
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
  const { email, password } = req.body
  
  const user = await User.findOne({ email })
  // check user exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})



// Get current user
//  /api/users/me
//  Private

const getMe = asyncHandler(async (req, res) => {
  const user = { id: req.user._id, email: req.user.email, name: req.user.name };
  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
