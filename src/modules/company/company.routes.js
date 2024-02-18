import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  addCompanySchema,
  deleteCompanySchema,
  getCompanySchema,
  updateCompanySchema,
} from "./company.validation.js";
import {
  addCompany,
  deleteCompany,
  getApplications,
  getCompany,
  searchCompany,
  updateCompany,
} from "./company.controllers.js";
import { unique } from "../../middleware/uniqueEmail.js";
import { companyModel } from "./compony.model.js";
const companyRoute = Router();

companyRoute
  .get("/search", authenticate, authorize("user", "hr"), searchCompany)
  .get("/applications", authenticate, authorize("hr"), getApplications)
  .get(
    "/:id",
    authenticate,
    authorize("hr"),
    validation(getCompanySchema),
    getCompany
  )
  .post(
    "/",
    authenticate,
    authorize("hr"),
    validation(addCompanySchema),
    unique(companyModel),
    addCompany
  )
  .patch(
    "/:id",
    authenticate,
    authorize("hr"),
    validation(updateCompanySchema),
    updateCompany
  )
  .delete(
    "/:id",
    authenticate,
    authorize("hr"),
    validation(deleteCompanySchema),
    deleteCompany
  );
export default companyRoute;
