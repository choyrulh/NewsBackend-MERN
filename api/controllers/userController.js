const Users = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");

getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();
  if (!users) {
    const err = new Error("No users found");
    return next(err);
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    const err = new Error(`No user found with id: ${req.params.id}`);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

// updateUser = catchAsync(async (req, res, next) => {
//   const { name, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 12);

//   const updateUser = await Users.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: name,
//       email: email,
//       password: hashedPassword,
//     },
//     { new: true }
//   );

//   res.status(200).json({
//     status: "success",
//     data: updateUser,
//   });
// });

deleteUser = catchAsync(async (req, res, next) => {
  await Users.findByIdAndDelete(req.params.id);

  res.status(200).json({ status: "success", data: null });
});

module.exports = {
  getAllUsers,
  getUser,
  // updateUser,
  deleteUser,
};
