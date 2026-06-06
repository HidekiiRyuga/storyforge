import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema(
  {
    title: String,
    content: String,

    unlockChapter: {
      type: Number,
      required: true,
    },

    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
  },
  { timestamps: true }
);

const Artifact = mongoose.model("Artifact", artifactSchema);

export default Artifact;