import { AppError, catchError } from "../../utils/errorHandler.js";
import { applicationModel } from "../application/application.model.js";
import { companyModel } from "./compony.model.js";

export const getCompany = catchError(async (req, res, next) => {
  const { id } = req.params;
  req.body.hr = req.user._id;
  const company = await companyModel.findById(id).populate("hr", ["username"]);
  res.status(200).json({ message: "done successfully", company });
});
//*** need update` */
export const getApplications = catchError(async (req, res, next) => {
  const hrId = req.user._id;
  const applications = await applicationModel
    .find() // Adjust the path based on your actual schema
    .populate({
      path: "jobId",
      populate: {
        path: "addBy",
      },
    })
    .populate("userId", ["username"]);

  res.status(200).json({ message: "done successfully", applications });
});

export const addCompany = catchError(async (req, res, next) => {
  req.body.hr = req.user._id;
  const company = await companyModel.create(req.body);
  res.status(200).json({ message: "added successfully", company });
});

export const updateCompany = catchError(async (req, res, next) => {
  const hrId = req.user._id;
  const { id } = req.params;
  const company = await companyModel.findById(id);
  if (!company) throw new AppError("company not found", 404);
  if (company.hr != hrId) throw new AppError("Forbidden", 403);
  const updated = await company.updateOne(req.body, { new: true });
  res.status(200).json({ message: "updated successfully", updated });
});

export const deleteCompany = catchError(async (req, res, next) => {
  const hrId = req.user._id;
  const { id } = req.params;
  const company = await companyModel.findById(id);
  if (!company) throw new AppError("company not found", 404);
  if (company.hr != hrId) throw new AppError("Forbidden", 403);
  const deleted = await company.deleteOne();
  res.status(200).json({ message: "deleted successfully", deleted });
});

export const searchCompany = catchError(async (req, res, next) => {
  const { name } = req.query;
  const company = await companyModel
    .find({
      company_name: new RegExp(name, "i"),
    })
    .populate("hr", ["username"]);
  if (!company) res.status(200).json({ message: "company not found" });
  else res.status(200).json({ message: "done", company });
});
