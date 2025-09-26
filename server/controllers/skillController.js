import Skill from "../models/Skill.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({}).sort({ order: 1 });
  res.json(skills);
});

const getSkillById = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    res.json(skill);
  } else {
    res.status(404);
    throw new Error("Skill category not found");
  }
});

const createSkill = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, skills } = req.body;
  const skill = new Skill({ user: req.user._id, title, skills });
  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
});

const updateSkill = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, skills } = req.body;
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    skill.title = title || skill.title;
    skill.skills = skills || skill.skills;
    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } else {
    res.status(404);
    throw new Error("Skill category not found");
  }
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    await skill.deleteOne();
    res.json({ message: "Skill category removed" });
  } else {
    res.status(404);
    throw new Error("Skill category not found");
  }
});

const reorderSkills = asyncHandler(async (req, res) => {
  const { newOrder } = req.body;
  const bulkOps = newOrder.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));
  await Skill.bulkWrite(bulkOps);
  res.json({ message: "Skills reordered successfully" });
});

export {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
};
