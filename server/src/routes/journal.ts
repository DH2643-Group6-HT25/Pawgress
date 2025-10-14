
import express from "express";
import * as journalService from "../service/journalService";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Configure multer to save files in public/images/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// Upload or replace today's journal image
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    const { user } = req.body;
    const file = (req as any).file;
    if (!user || !file) {
      // Delete uploaded file if present but validation fails
      if (file && file.path) {
        fs.unlink(file.path, () => {});
      }
      return res.status(400).json({ error: "Missing user or image" });
    }
    const imageUrl = `/images/uploads/${file.filename}`;
    const updated = await journalService.upsertTodayJournalImage(user, imageUrl);
    res.status(201).json(updated);
  } catch (err) {
    // Delete uploaded file if error
    const file = (req as any).file;
    if (file && file.path) {
      fs.unlink(file.path, () => {});
    }
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get all journals for a user, sorted by date desc
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query as { userId?: string };
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    const journals = await journalService.getJournalsForUser(userId);
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add or update today's journal for a user (one per day), with optional image
router.post("/", upload.single("image"), async (req, res) => {
  let file;
  try {
    const { journal, formatting, user } = req.body as { journal?: string; formatting?: any; user?: string };
    file = (req as any).file;
    if (!journal || !user) {
      if (file && file.path) {
        fs.unlink(file.path, () => {});
      }
      return res.status(400).json({ error: "Missing fields" });
    }
    // Only allow upsert for today's journal
    let imageUrl;
    if (file) {
      imageUrl = `/images/uploads/${file.filename}`;
    }
    // If formatting is a string (from form-data), parse it
    let parsedFormatting = formatting;
    if (typeof formatting === "string") {
      try {
        parsedFormatting = JSON.parse(formatting);
      } catch {
        if (file && file.path) {
          fs.unlink(file.path, () => {});
        }
        return res.status(400).json({ error: "Invalid formatting" });
      }
    }
    const updated = await journalService.upsertTodayJournal(journal, parsedFormatting, user, imageUrl);
    res.status(201).json(updated);
  } catch (err) {
    if (file && file.path) {
      fs.unlink(file.path, () => {});
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a journal by ID (and remove stored image if present)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Get journal to find imageUrl
    const journal = await journalService.getJournalById(id);
    if (!journal) return res.status(404).json({ error: "Journal not found" });
    // Remove journal
    await journalService.removeJournal(id);
    // Remove image file if present
    if (journal.imageUrl && typeof journal.imageUrl === 'string' && journal.imageUrl.length > 0) {
      const imgPath = path.join(__dirname, "../../public", journal.imageUrl);
      fs.unlink(imgPath, err => {
        if (err && err.code !== 'ENOENT') {
          console.warn("Failed to delete image:", imgPath, err.message);
        }
      });
    }
    res.json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
