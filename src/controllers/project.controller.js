import multer from "multer";
import supabase from "../config/supabase.js";
import Project from "../models/Project.model.js";
import mongoose from "mongoose";

const storage = multer.memoryStorage();
export const upload = multer({ storage });


export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { projectId } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileName = `${Date.now()}_${file.originalname}`;

    const { error } = await supabase.storage
      .from("datasets")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("datasets")
      .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { fileUrl, status: "uploaded" },
      { new: true }
    );

    res.json({
      message: "File uploaded successfully",
      fileUrl,
      project
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createProject = async (req, res) => {
  try {
    const { projectName, description } = req.body;

    const project = await Project.create({
      userId: req.user.id,
      projectName,
      description
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({
      createdAt: -1
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const runPCA = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project || !project.fileUrl) {
      return res.status(400).json({ message: "File not found" });
    }

    // const response = await fetch("http://127.0.0.1:8000/analyze/pca", {
    const response = await fetch("https://ml-services-genomics.onrender.com/analyze/pca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file_url: project.fileUrl
      })
    });

    console.log("printing the file name for Pca : ",project.fileUrl);

    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const runHeatmap = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    // const response = await fetch("http://127.0.0.1:8000/analyze/heatmap", {
    const response = await fetch("https://ml-services-genomics.onrender.com/analyze/heatmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file_url: project.fileUrl
      })
    });
    console.log("printing the file name Heatmaps : ",project.fileUrl);
    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const runVolcano = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    // const response = await fetch("http://127.0.0.1:8000/analyze/volcano", {
    const response = await fetch("https://ml-services-genomics.onrender.com/analyze/volcano", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file_url: project.fileUrl
      })
    });
    console.log("printing the file name for volcano: ",project.fileUrl);
    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const runClustering = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project || !project.fileUrl) {
      return res.status(400).json({ message: "File not found" });
    }

    const response = await fetch(
    "https://ml-services-genomics.onrender.com/analyze/clustering",
    //  "http://127.0.0.1:8000/analyze/clustering",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file_url: project.fileUrl,
          n_clusters: 3
        })
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error("Clustering error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const runConfusion = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    const response = await fetch("https://ml-services-genomics.onrender.com/analyze/confusion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file_url: project.fileUrl
      })
    });
    console.log("printing the file name for Confusion : ",project.fileUrl);

    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};