import Joi from "joi";

export const signinSchema = Joi.object({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
  params: {},
  query: {},
});

export const signupSchema = Joi.object({
  body: {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    recovery_email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().required(),
    // .pattern(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // ),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    DOB: Joi.date(),
    phone: Joi.string(),
  },
  params: {},
  query: {},
});
