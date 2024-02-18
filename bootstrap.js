import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/modules/auth/auth.routes.js";
import userRoute from "./src/modules/user/user.routes.js";
import jobRoute from "./src/modules/job/job.routes.js";
import companyRoute from "./src/modules/company/company.routes.js";

dotenv.config();

export const bootstrap = (app) => {
  app.use(express.json());

  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/company", companyRoute);
  app.use("/job", jobRoute);

  app.use((error, req, res, next) => {
    const { message, status, stack } = error;
    res
      .status(status || 500)
      .json({ message, ...(process.env.MODE === "development" && { stack }) });
  });
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM3ZGQ3NjhkODU4MTE1ODBkOTE2ZjkiLCJ1c2VybmFtZSI6Im9tbmlha2FsZWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwNzU5NzM1M30.i8fpjHH3od1M55vegufJvGtbB1dDg6q7SK_zRu8bXKk
