import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      enum: ["onsite", "remotely", "hybrid"],
    },
    workingTime: {
      type: String,
      enum: ["part-time", "full-time"],
    },
    seniorityLevel: {
      type: String,
      enum: ["junior", "mid-level", "senior", "team-Lead", "cto"],
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
    addBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
   
    timestamps: true,
  }
);

export const jobModel = mongoose.model("job", jobSchema);
