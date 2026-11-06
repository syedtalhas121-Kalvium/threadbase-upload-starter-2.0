import express from "express";
import multer from "multer";
import upload from "../config/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const url = `/uploads/${req.file.filename}`;
  return res.status(201).json({ url, filename: req.file.filename });
});

// Convert Multer and file-filter failures into clear client errors.
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large (max 5MB)" });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err?.message === "Only image files are allowed") {
    return res.status(400).json({ error: err.message });
  }

  return next(err);
});

export default router;
