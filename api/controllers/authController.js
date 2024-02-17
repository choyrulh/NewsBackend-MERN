const { promisify } = require("util");
const Users = require("../models/userModels");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

// Sign token and send it to client with cookie with httpOnly and secure flags set to true
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Create or Register User and send token to client
createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = await req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return next(new appError("Please provide name, email and password", 400));
  }

  // check if user already exists
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    return next(new appError("User already exists", 400));
  }

  // if user does not exist, create a new user
  const newUser = await Users.create({
    name: name,
    email: email,

    password: password,
    passwordConfirm: passwordConfirm,
    role: role,
  });

  const token = signToken(newUser._id);

  res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });

  res.status(201).json({
    status: "success",
    token: token,
    data: newUser,
  });
});

// Update user by id and return updated user with token and cookie with secure and httpOnly flags set to true and maxAge set to 3600000 to expire the cookie after 1 hour after it is set in the browser and sent back to the server
updateUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const updatedUser = await Users.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      // password: hashedPassword,
      password: password,
    },
    { new: true, runValidators: true } // Tambahkan opsi runValidators untuk menjalankan validasi schema saat update
  );

  if (!updatedUser) {
    return next(new appError("User not found", 404));
  }

  const token = signToken(updatedUser._id);

  res.status(200).json({
    message: "User updated successfully",
    token: token,
    data: updatedUser,
  });
});

loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1 - check if email and password user exists
  if (!email || !password) {
    return next(new appError("Please provide email and password", 400));
  }

  // 2 - check if user exist email and password is correct
  const user = await Users.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  // 3 - if everything ok send token to client
  const token = signToken(user._id);

  // 4 - set cookie with the token
  res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });

  res.status(200).json({
    status: "success",
    token: token,
  });
});

// Logout user and clear cookie with httpOnly and secure flags set to true and maxAge set to 0 to expire the cookie immediately after it is set in the browser and sent back to the server.
logOutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, secure: true, maxAge: 0 });
  res.status(200).json({ status: "success" });
};

// Verify token and get user id from it to populate req.user in protected routes and other middleware
const verifyToken = (req, res, next) => {
  const header = req.headers.cookie;
  const token = header.split("=")[1];
  if (!token) {
    return next(new appError("Please login first", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new appError("Please login first", 401));
    }
    req.user = decoded;
    next();
  });
};

const getUserLogin = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      role: user.role,
      name: user.name,
      email: user.email,
    },
  });
});

// Protect middleware - only for logged in users to access the route
protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new appError("You are not logged in! Please log in to get access", 401)
    );
  }

  // 2) verification  of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) check if user still exist
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError("The user belonging to this token does no longer exist", 401)
    );
  }

  // 4) check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new appError("User recently changed password! Please log in again", 401)
    );
  }

  // grant access to protected route
  req.user = currentUser;

  next();
});

// Restrict middleware - only for logged in users to access the route
restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

module.exports = {
  createUser,
  updateUser,
  loginUser,
  protect,
  restrictTo,
  getUserLogin,
  verifyToken,
  logOutUser,
};
