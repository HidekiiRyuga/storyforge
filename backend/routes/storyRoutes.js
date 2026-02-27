import express from "express";
import Story from "../models/Story.js";
import User from "../models/User.js";
import Artifact from "../models/Artifact.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Get stories by logged-in author
router.get("/author/me", authMiddleware, async (req, res) => {
  try {
    const stories = await Story.find({ author: req.userId });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch author stories" });
  }
});
// Create a new story
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const story = new Story({
      title,
      description,
      chapters: [],
      author: req.userId,
    });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ message: "Failed to create story" });
  }
});
/**
 * GET all stories (for /stories page)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stories = await Story.find().select("title description");
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
});

/**
 * GET single story by ID (for reader)
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    const user = await User.findById(req.userId);

    if (!story || !user) {
      return res.status(404).json({ message: "Not found" });
    }

    const unlockedArtifacts = await Artifact.find({
      storyId: story._id,
      unlockChapter: { $in: user.readChapters },
    });



    res.json({
      story,
      readChapters: user.readChapters,
      artifacts: unlockedArtifacts,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch story" });
  }
});

// Add chapter to a story
router.post("/:id/chapter", authMiddleware, async (req, res) => {
  try {
    const { chapterNumber, title, content } = req.body;

    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // ensure only author edits
    if (story.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    story.chapters.push({
  chapterNumber,
  title,
  content,});

    await story.save();

    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add chapter" });
  }
});
// Delete chapter
router.delete("/:id/chapter/:chapterNumber", authMiddleware, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    story.chapters = story.chapters.filter(
      (ch) => ch.chapterNumber !== Number(req.params.chapterNumber)
    );

    await story.save();

    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete chapter" });
  }
});
// UPDATE CHAPTER
router.put("/:id/chapter/:chapterNumber", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // only author can edit
    if (story.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // find chapter
    const chapter = story.chapters.find(
      (ch) => ch.chapterNumber === Number(req.params.chapterNumber)
    );

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // update fields
    chapter.title = title;
    chapter.content = content;

    await story.save();

    res.json(story);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update chapter" });
  }
});
// ADD ARTIFACT TO CHAPTER
router.post("/:id/chapter/:chapterNumber/artifact", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const chapter = story.chapters.find(
      (ch) => ch.chapterNumber === Number(req.params.chapterNumber)
    );

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    chapter.artifacts.push({ title, content });

    await story.save();

    res.json(story);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add artifact" });
  }
});



export default router;
