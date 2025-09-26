import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    aboutNarrative: {
      type: String,
      required: true,
    },
    aboutSkills: [
      {
        type: String,
      },
    ],
    profilePhoto: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
