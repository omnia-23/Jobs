import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { userModel } from "../user/user.model.js";
import { AppError, catchError } from "../../utils/errorHandler.js";

dotenv.config();

export const signUp = catchError(async (req, res, next) => {
  const { password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 5);
  req.body.password = hashPassword;
  const user = await userModel.create(req.body);
  res.status(201).json({ message: "added successfully", user });
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password))
    throw new AppError("incorrect email or password", 400);

  await user.updateOne({ status: "online" });
  const { _id, username, role } = user;
  const token = jwt.sign({ _id, username, role }, process.env.KEY);
  res.status(200).json({ message: "log in successfully!!!!", token });
});
