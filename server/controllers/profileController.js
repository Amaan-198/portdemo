import Profile from "../models/Profile.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({}).lean(); // Use .lean() for a plain JS object
  if (profile) {
    // One-time data migration for the frontend. If 'about' exists and 'aboutNarrative' doesn't,
    // populate 'aboutNarrative' with the old data. This prevents data loss when the user
    // first loads the newly designed admin form.
    if (profile.about && !profile.aboutNarrative) {
      profile.aboutNarrative = profile.about;
    }
    res.json(profile);
  } else {
    // Return a default/empty profile object if none exists
    res.json({
      name: "Amaan Ahmed Shaikh",
      headline: "Enter your headline here",
      aboutNarrative: "Enter your narrative here.",
      aboutSkills: ["React", "Node.js", "MongoDB"],
      profilePhoto: "",
      resumeUrl: "",
    });
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, headline, aboutNarrative, aboutSkills, profilePhoto, resumeUrl } = req.body;
  let profile = await Profile.findOne({});

  if (profile) {
    // Apply form data to the profile
    profile.name = name;
    profile.headline = headline;
    profile.aboutNarrative = aboutNarrative;
    profile.aboutSkills = aboutSkills;
    profile.profilePhoto = profilePhoto;
    profile.resumeUrl = resumeUrl;

    // After updating, unset the old 'about' field to clean up the database document.
    // The `about` field is no longer in the schema, so we use `set` to remove it.
    if (profile.get('about')) {
      profile.set('about', undefined);
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    // Create a new profile if one doesn't exist
    profile = new Profile({
      user: req.user._id,
      name,
      headline,
      aboutNarrative,
      aboutSkills,
      profilePhoto,
      resumeUrl,
    });
    const createdProfile = await profile.save();
    res.status(201).json(createdProfile);
  }
});

export { getProfile, updateProfile };
