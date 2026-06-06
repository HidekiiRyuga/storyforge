import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Progress from "../models/Progress.js";

const router = express.Router();

// Mark chapter as read
router.post("/read", authMiddleware, async (req, res) => {
  const { storyId, chapterNumber } = req.body;

  try {
    let progress = await Progress.findOne({
      userId: req.userId,
      storyId,
    });

    if (!progress) {
      progress = new Progress({
        userId: req.userId,
        storyId,
        readChapters: [],
      });
    }

    if (!progress.readChapters.includes(chapterNumber)) {
      progress.readChapters.push(chapterNumber);
      await progress.save();
    }

    res.json({
      readChapters: progress.readChapters,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could not update progress",
    });
  }
});

export default router;
