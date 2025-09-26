import Project from "../models/Project.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ order: "asc" });
  res.json(projects);
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    category,
    description,
    extendedDescription,
    imageUrls,
    badge,
    githubUrl,
    liveUrl,
  } = req.body;
  const project = new Project({
    user: req.user._id,
    title,
    category,
    description,
    extendedDescription,
    imageUrls,
    badge,
    githubUrl,
    liveUrl,
  });
  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

const updateProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    category,
    description,
    extendedDescription,
    imageUrls,
    badge,
    githubUrl,
    liveUrl,
  } = req.body;
  const project = await Project.findById(req.params.id);
  if (project) {
    project.title = title;
    project.category = category;
    project.description = description;
    project.extendedDescription = extendedDescription;
    project.imageUrls = imageUrls;
    // For optional fields, only update if they are provided in the request body.
    // This allows clearing a field by sending an empty string.
    if (req.body.badge !== undefined) project.badge = badge;
    if (req.body.githubUrl !== undefined) project.githubUrl = githubUrl;
    if (req.body.liveUrl !== undefined) project.liveUrl = liveUrl;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    await project.deleteOne();
    res.json({ message: "Project removed" });
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const reorderProjects = asyncHandler(async (req, res) => {
  const { newOrder } = req.body;
  const bulkOps = newOrder.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
  }));
  await Project.bulkWrite(bulkOps);
  res.json({ message: "Projects reordered successfully" });
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
};
