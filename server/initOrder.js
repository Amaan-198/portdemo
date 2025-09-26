import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Project from "./models/Project.js";

dotenv.config();
connectDB();

const initializeOrderFields = async () => {
  try {
    const projects = await Project.find({});
    if (projects.length > 0) {
      console.log("Initializing order fields for existing projects...");
      const bulkOps = projects.map((project, index) => ({
        updateOne: {
          filter: { _id: project._id, order: { $exists: false } },
          update: { $set: { order: index } },
        },
      }));
      await Project.bulkWrite(bulkOps);
      console.log("Order fields initialized successfully.");
    } else {
      console.log("No projects found to initialize.");
    }
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

initializeOrderFields();
