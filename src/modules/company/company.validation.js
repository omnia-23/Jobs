import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

export const addCompanySchema = Joi.object({
  body: {
    company_name: Joi.string().required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numOfEmployees: Joi.object({
      min: Joi.number().required(),
      max: Joi.number().required(),
    }).required(),
    email: Joi.string().email().required(),
  },
  params: {},
  query: {},
});

export const updateCompanySchema = Joi.object({
  body: {
    company_name: Joi.string(),
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numOfEmployees: Joi.object({
      min: Joi.number(),
      max: Joi.number(),
    }),
    email: Joi.string().email(),
  },
  params: { id: Joi.custom(validateID).required() },
  query: {},
});

export const deleteCompanySchema = Joi.object({
  body: {},
  params: { id: Joi.custom(validateID).required() },
  query: {},
});
export const getCompanySchema = Joi.object({
  body: {},
  params: { id: Joi.custom(validateID).required() },
  query: {},
});
