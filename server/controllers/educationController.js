import Education from "../models/Education.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.find({}).sort({ order: 1 });
  res.json(education);
});

const getEducationById = asyncHandler(async (req, res) => {
  const educationItem = await Education.findById(req.params.id);
  if (educationItem) {
    res.json(educationItem);
  } else {
    res.status(404);
    throw new Error("Education item not found");
  }
});

const createEducation = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { degree, institution, dates, cgpa } = req.body;
  const educationItem = new Education({
    user: req.user._id,
    degree,
    institution,
    dates,
    cgpa,
  });
  const createdItem = await educationItem.save();
  res.status(201).json(createdItem);
});

const updateEducation = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { degree, institution, dates, cgpa } = req.body;
  const educationItem = await Education.findById(req.params.id);
  if (educationItem) {
    educationItem.degree = degree || educationItem.degree;
    educationItem.institution = institution || educationItem.institution;
    educationItem.dates = dates || educationItem.dates;
    educationItem.cgpa = cgpa || educationItem.cgpa;
    const updatedItem = await educationItem.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Education item not found");
  }
});

const deleteEducation = asyncHandler(async (req, res) => {
  const educationItem = await Education.findById(req.params.id);
  if (educationItem) {
    await educationItem.deleteOne();
    res.json({ message: "Education item removed" });
  } else {
    res.status(404);
    throw new Error("Education item not found");
  }
});

const reorderEducation = asyncHandler(async (req, res) => {
  const { newOrder } = req.body;
  const bulkOps = newOrder.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));
  await Education.bulkWrite(bulkOps);
  res.json({ message: "Education items reordered" });
});

export {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
  reorderEducation,
};
