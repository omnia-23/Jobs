import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  addJobSchema,
  applyJobSchema,
  deleteJobSchema,
  updateJobSchema,
} from "./job.validation.js";
import {
  addJob,
  applyToJob,
  deleteJob,
  getJob,
  getJobByCompany,
  getJobWithFilter,
  updateJob,
} from "./job.controllers.js";

const jobRoute = Router();

jobRoute
  .get("/", authenticate, authorize("hr", "user"), getJobWithFilter)
  .get("/info", authenticate, authorize("hr", "user"), getJob)
  .get("/company", authenticate, authorize("hr", "user"), getJobByCompany)
  .post("/", authenticate, authorize("hr"), validation(addJobSchema), addJob)
  .post(
    "/apply/:id",
    authenticate,
    authorize("user"),
    validation(applyJobSchema),
    applyToJob
  )
  .patch(
    "/:id",
    authenticate,
    authorize("hr"),
    validation(updateJobSchema),
    updateJob
  )
  .delete(
    "/:id",
    authenticate,
    authorize("hr"),
    validation(deleteJobSchema),
    deleteJob
  );
export default jobRoute;
