import Achievement from "../models/Achievement.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({}).sort({ order: 1 });
  res.json(achievements);
});

const getAchievementById = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (achievement) {
    res.json(achievement);
  } else {
    res.status(404);
    throw new Error("Achievement not found");
  }
});

const createAchievement = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description } = req.body;
  const achievement = new Achievement({
    user: req.user._id,
    title,
    description,
  });
  const createdAchievement = await achievement.save();
  res.status(201).json(createdAchievement);
});

const updateAchievement = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description } = req.body;
  const achievement = await Achievement.findById(req.params.id);
  if (achievement) {
    achievement.title = title || achievement.title;
    achievement.description = description || achievement.description;
    const updatedAchievement = await achievement.save();
    res.json(updatedAchievement);
  } else {
    res.status(404);
    throw new Error("Achievement not found");
  }
});

const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (achievement) {
    await achievement.deleteOne();
    res.json({ message: "Achievement removed" });
  } else {
    res.status(404);
    throw new Error("Achievement not found");
  }
});

const reorderAchievements = asyncHandler(async (req, res) => {
  const { newOrder } = req.body;
  const bulkOps = newOrder.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));
  await Achievement.bulkWrite(bulkOps);
  res.json({ message: "Achievements reordered successfully" });
});

export {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  reorderAchievements,
};
