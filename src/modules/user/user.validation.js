import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}
export const updateUserSchema = Joi.object({
  body: {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    recovery_email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    first_name: Joi.string(),
    last_name: Joi.string(),
    DOB: Joi.date(),
    phone: Joi.string(),
  },
  params: {},
  query: {},
});

export const getUserSchema = Joi.object({
  body: {},
  params: { id: Joi.custom(validateID) },
  query: { user: Joi.custom(validateID) },
});

export const updatePasswordSchema = Joi.object({
  body: { password: Joi.string().required() },
  params: {},
  query: {},
});

export const getByEmailSchema = Joi.object({
  body: {},
  params: {},
  query: {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  },
});
