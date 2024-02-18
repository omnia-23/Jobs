import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    industry: String,
    address: String,
    numOfEmployees: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
    },
    email: {
      type: String,
      unique: [true, "email should be unique"],
      required: ["true", "email is required"],
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    hr: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);


export const companyModel = mongoose.model("company", companySchema);
