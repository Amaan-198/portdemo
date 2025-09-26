import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post("/api/users/login", formData);
// --- Project Functions ---
export const getProjects = () => API.get("/api/projects");
export const createProject = (projectData) =>
  API.post("/api/projects", projectData);
export const getProjectById = (id) => API.get(`/api/projects/${id}`);
export const updateProject = (id, projectData) =>
  API.put(`/api/projects/${id}`, projectData);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);
export const reorderProjects = (newOrder) =>
  API.put("/api/projects/reorder", { newOrder });

// --- Experience Functions ---
export const getExperiences = () => API.get("/api/experiences");
export const getExperienceById = (id) => API.get(`/api/experiences/${id}`);
export const createExperience = (experienceData) =>
  API.post("/api/experiences", experienceData);
export const updateExperience = (id, experienceData) =>
  API.put(`/api/experiences/${id}`, experienceData);
export const deleteExperience = (id) => API.delete(`/api/experiences/${id}`);
export const reorderExperiences = (newOrder) =>
  API.put("/api/experiences/reorder", { newOrder });

// --- Achievement Functions ---
export const getAchievements = () => API.get("/api/achievements");
export const createAchievement = (achievementData) =>
  API.post("/api/achievements", achievementData);
export const getAchievementById = (id) => API.get(`/api/achievements/${id}`);
export const updateAchievement = (id, achievementData) =>
  API.put(`/api/achievements/${id}`, achievementData);
export const deleteAchievement = (id) => API.delete(`/api/achievements/${id}`);
export const reorderAchievements = (newOrder) =>
  API.put("/api/achievements/reorder", { newOrder });

// --- Certificate Functions ---
export const getCertificates = () => API.get("/api/certificates");
export const createCertificate = (certificateData) =>
  API.post("/api/certificates", certificateData);
export const getCertificateById = (id) => API.get(`/api/certificates/${id}`);
export const updateCertificate = (id, certificateData) =>
  API.put(`/api/certificates/${id}`, certificateData);
export const deleteCertificate = (id) => API.delete(`/api/certificates/${id}`);
export const reorderCertificates = (newOrder) =>
  API.put("/api/certificates/reorder", { newOrder });

// --- Skill Functions ---
export const getSkills = () => API.get("/api/skills");
export const createSkill = (skillData) => API.post("/api/skills", skillData);
export const getSkillById = (id) => API.get(`/api/skills/${id}`);
export const updateSkill = (id, skillData) =>
  API.put(`/api/skills/${id}`, skillData);
export const deleteSkill = (id) => API.delete(`/api/skills/${id}`);
export const reorderSkills = (newOrder) =>
  API.put("/api/skills/reorder", { newOrder });

// --- Profile Functions ---
export const getProfile = () => API.get("/api/profile");
export const updateProfile = (profileData) =>
  API.put("/api/profile", profileData);

// --- Education Functions ---
export const getEducation = () => API.get("/api/education");
export const getEducationById = (id) => API.get(`/api/education/${id}`);
export const createEducation = (educationData) =>
  API.post("/api/education", educationData);
export const updateEducation = (id, educationData) =>
  API.put(`/api/education/${id}`, educationData);
export const deleteEducation = (id) => API.delete(`/api/education/${id}`);
export const reorderEducation = (newOrder) =>
  API.put("/api/education/reorder", { newOrder });
export const uploadImages = (formData) => {
  return API.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
