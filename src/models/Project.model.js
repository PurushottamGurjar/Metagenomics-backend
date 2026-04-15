import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    fileUrl: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["created", "uploaded", "processing", "completed"],
      default: "created"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Project", projectSchema);