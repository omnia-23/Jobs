import bcrypt from "bcrypt";
import { AppError, catchError } from "../../utils/errorHandler.js";
import { userModel } from "./user.model.js";

export const updateUser = catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw new AppError("this email is exist", 404);
  const updated = await userModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "updated successfully", updated });
});

export const deleteUser = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const user = await userModel.findByIdAndDelete(_id);
  res.status(200).json({ message: "deleted successfully", user });
});

export const getDetails = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const userId = req.query.user;
  let user;
  if (userId) user = await userModel.findById(userId);
  else user = await userModel.findById(_id);
  res.status(200).json({ message: "done successfully", user });
});

export const getUser = catchError(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModel.findById(id);
  res.status(200).json({ message: "done", user });
});

export const updatePassword = catchError(async (req, res, next) => {
  const id = req.user._id;
  const hashPassword = bcrypt.hashSync(req.body.password, 5);
  const user = await userModel.findByIdAndUpdate(
    id,
    {
      password: hashPassword,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else res.status(200).json({ message: "done", user });
});

export const getByRecoveryEmail = catchError(async (req, res, next) => {
  const email = req.query.email;
  const users = await userModel.find({ recovery_email: email });
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }
  else res.status(200).json({ message: "done", users });
});
