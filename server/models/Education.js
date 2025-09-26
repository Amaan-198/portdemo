import mongoose from "mongoose";

const educationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    dates: { type: String, required: true },
    cgpa: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);
export default Education;
