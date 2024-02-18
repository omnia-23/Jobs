import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "job",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    technicalSkills: [
      {
        type: String,
      },
    ],
    softSkills: [
      {
        type: String,
      },
    ],
    resume: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const applicationModel = mongoose.model(
  "application",
  applicationSchema
);
