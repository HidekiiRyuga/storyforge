import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    default: "text",
  },
  content: String,
  unlockChapter: Number,
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
});

const Artifact = mongoose.model("Artifact", artifactSchema);
export default Artifact;
