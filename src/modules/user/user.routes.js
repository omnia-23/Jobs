import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import {
  deleteUser,
  getByRecoveryEmail,
  getDetails,
  getUser,
  updatePassword,
  updateUser,
} from "./user.controllers.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  getByEmailSchema,
  getUserSchema,
  updatePasswordSchema,
} from "./user.validation.js";

const userRoute = Router();

userRoute
  .get(
    "/",
    authenticate,
    authorize("user", "hr"),
    validation(getUserSchema),
    getDetails
  )
  .get(
    "/email",
    authenticate,
    authorize("user", "hr"),
    validation(getByEmailSchema),
    getByRecoveryEmail
  )
  .get(
    "/:id",
    authenticate,
    authorize("user", "hr"),
    validation(getUserSchema),
    getUser
  )
  .patch("/", authenticate, authorize("user"), updateUser)
  .delete("/", authenticate, authorize("user"), deleteUser)
  .patch(
    "/password",
    authenticate,
    authorize("user"),
    validation(updatePasswordSchema),
    updatePassword
  );
export default userRoute;
