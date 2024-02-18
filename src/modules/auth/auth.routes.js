import { Router } from "express";
import { signIn, signUp } from "./auth.controllers.js";
import { authenticate, uniqueEmail } from "./auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { signinSchema, signupSchema } from "./auth.validation.js";
const authRoute = Router();

authRoute
  .post("/signup", uniqueEmail, validation(signupSchema), signUp)
  .post("/signin", validation(signinSchema), signIn);

export default authRoute;
