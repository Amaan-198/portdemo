import Experience from "../models/Experience.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({}).sort({ order: 1 });
  res.json(experiences);
});

const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (experience) {
    res.json(experience);
  } else {
    throw new Error("Experience not found");
  }
});

const createExperience = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { role, company, dates, description } = req.body;
  const experience = new Experience({
    user: req.user._id,
    role,
    company,
    dates,
    description,
  });
  const createdExperience = await experience.save();
  res.status(201).json(createdExperience);
});

const updateExperience = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { role, company, dates, description } = req.body;
  const experience = await Experience.findById(req.params.id);
  if (experience) {
    experience.role = role;
    experience.company = company;
    experience.dates = dates;
    experience.description = description;
    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } else {
    throw new Error("Experience not found");
  }
});

const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (experience) {
    await experience.deleteOne();
    res.json({ message: "Experience removed" });
  } else {
    throw new Error("Experience not found");
  }
});

const reorderExperiences = asyncHandler(async (req, res) => {
  const { newOrder } = req.body;
  const bulkOps = newOrder.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));
  await Experience.bulkWrite(bulkOps);
  res.json({ message: "Experiences reordered successfully" });
});

export {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  reorderExperiences,
};
