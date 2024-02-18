import { AppError, catchError } from "../../utils/errorHandler.js";
import { applicationModel } from "../application/application.model.js";
import { companyModel } from "../company/compony.model.js";
import { userModel } from "../user/user.model.js";
import { jobModel } from "./job.model.js";

export const getJobWithFilter = catchError(async (req, res, next) => {
  // const filter = [
  //   workingTime,
  //   location,
  //   seniorityLevel,
  //   title,
  //   technicalSkills,
  // ];

  const query = { ...req.query };
  const jobs = await jobModel.find(query);
  res.status(200).json({ message: "done", jobs });
});

export const getJob = catchError(async (req, res, next) => {
  const jobs = await jobModel.find().populate("addBy", ["username"]);
  res.status(200).json({ message: "done", jobs });
});

export const getJobByCompany = catchError(async (req, res, next) => {
  const { name } = req.query;
  const company = await companyModel.findOne({ company_name: name });
  if (!company) throw new AppError("not found", 404);

  const hr = await userModel.findById(company.hr);
  if (!hr) throw new AppError("not found", 404);

  const jobs = await jobModel.find({ addBy: hr._id });
  res.status(200).json({ message: "done", jobs });
});

export const addJob = catchError(async (req, res, next) => {
  req.body.addBy = req.user._id;
  const job = await jobModel.create(req.body);
  res.status(200).json({ message: "added successfully", job });
});

export const updateJob = catchError(async (req, res, next) => {
  const hrId = req.user._id;
  const { id } = req.params;
  const job = await jobModel.findById(id);
  if (!job) throw new AppError("job not found", 404);
  if (job.addBy != hrId) throw new AppError("Forbidden", 403);
  const updated = await job.updateOne(req.body, { new: true });
  res.status(200).json({ message: "updated successfully", updated });
});

export const deleteJob = catchError(async (req, res, next) => {
  const hrId = req.user._id;
  const { id } = req.params;
  const job = await jobModel.findById(id);
  if (!job) throw new AppError("job not found", 404);
  if (job.addBy != hrId) throw new AppError("Forbidden", 403);
  const deleted = await job.deleteOne();
  res.status(200).json({ message: "deleted successfully", deleted });
});

export const applyToJob = catchError(async (req, res, next) => {
  const id = req.params.id;
  const app = await applicationModel.create({
    jobId: id,
    userId: req.user._id,
    technicalSkills: req.body.technicalSkills,
    softSkills: req.body.softSkills,
  });
  res.status(200).json({ message: "added successfully", app });
});
