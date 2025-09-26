import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    extendedDescription: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    badge: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
