import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// story routes
import storyRoutes from "./routes/storyRoutes.js";
app.use("/api/story", storyRoutes);
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);
import progressRoutes from "./routes/progressRoutes.js";
app.use("/api/progress", progressRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.error(err));
