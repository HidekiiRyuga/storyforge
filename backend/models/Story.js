import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
   chapters: [
  {
    chapterNumber: Number,
    title: String,
    content: String,

    artifacts: [
      {
        title: String,
        content: String,
      },
    ],
  },
],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
