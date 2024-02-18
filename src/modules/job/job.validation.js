import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

const Location = ["onsite", "remotely", "hybrid"];
const Time = ["part-time", "full-time"];
const Levels = ["junior", "mid-level", "senior", "team-Lead", "cto"];

export const addJobSchema = Joi.object({
  body: {
    title: Joi.string().required(),
    location: Joi.string()
      .valid(...Location)
      .required(),
    workingTime: Joi.string()
      .valid(...Time)
      .required(),
    seniorityLevel: Joi.string()
      .valid(...Levels)
      .required(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
  },
  params: {},
  query: {},
});

export const updateJobSchema = Joi.object({
  body: {
    title: Joi.string(),
    location: Joi.string().valid(...Location),
    workingTime: Joi.string().valid(...Time),
    seniorityLevel: Joi.string().valid(...Levels),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
  },
  params: { id: Joi.custom(validateID).required() },
  query: {},
});

export const deleteJobSchema = Joi.object({
  body: {},
  params: { id: Joi.custom(validateID).required() },
  query: {},
});

export const getJobSchema = Joi.object({
  body: {},
  params: { id: Joi.custom(validateID).required() },
  query: {},
});

export const applyJobSchema = Joi.object({
  body: {
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
  },
  params: { id: Joi.custom(validateID) },
  query: {},
});
