import mongoose from "mongoose";

const experienceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    role: { type: String, required: true },
    company: { type: String, required: true },
    dates: { type: String, required: true },
    description: [{ type: String, required: true }], // An array of strings for bullet points
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
