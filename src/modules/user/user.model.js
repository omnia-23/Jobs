import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: String,
    password: String,
    email: {
      type: String,
      unique: [true, "email should be unique"],
      required: ["true", "email is required"],
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    recovery_email: {
      type: String,
      required: ["true", "email is required"],
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    DOB: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "hr"],
      default: "user",
    },
    phone: String,
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("jobs", {
  ref: "job",
  foreignField: "addBy",
  localField: "_id",
});

userSchema.virtual("company", {
  ref: "company",
  foreignField: "hr",
  localField: "_id",
});

userSchema.pre(/find/i, function (next) {
  // this.populate("jobs");
  // this.populate("company");
  next();
});

userSchema.pre("save", function (next) {
  this.username = this.first_name + this.last_name;
  next();
});

export const userModel = mongoose.model("user", userSchema);
