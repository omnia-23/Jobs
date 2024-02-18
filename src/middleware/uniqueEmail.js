import { AppError, catchError } from "../utils/errorHandler.js";

export const unique = (model) =>
  catchError(async (req, res, next) => {
    const { email } = req.body;
    const exist = await model.findOne({ email });
    if (exist) throw new AppError("this email is exist", 400);
    next();
  });
