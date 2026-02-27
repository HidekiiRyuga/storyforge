import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Mark chapter as read
router.post("/read", authMiddleware, async (req, res) => {
  const { chapterNumber } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user.readChapters.includes(chapterNumber)) {
      user.readChapters.push(chapterNumber);
      await user.save();
    }

    res.json({ readChapters: user.readChapters });
  } catch (err) {
    res.status(500).json({ message: "Could not update progress" });
  }
});

export default router;
