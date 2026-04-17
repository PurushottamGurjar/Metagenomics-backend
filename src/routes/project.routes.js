import express from "express";
import { upload, uploadFile ,runPCA,runHeatmap,runVolcano,runClustering,runConfusion } from "../controllers/project.controller.js";
import {
  createProject,
  getProjects,
  getSingleProject
} from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getSingleProject);
router.post("/upload", protect, upload.single("file"), uploadFile);
router.post("/pca", protect, runPCA);
router.post("/heatmap", protect, runHeatmap);
router.post("/volcano", protect, runVolcano);
router.post("/clustering", protect, runClustering);
router.post("/confusion",protect, runConfusion);

export default router;