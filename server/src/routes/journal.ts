
import express from "express";
import { decodeAuth } from "../utils/authUtils";
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


// Get all journals for a user, sorted by date desc
router.get("/", async (req, res) => {
  try {
    const userId = decodeAuth(req);
    if (!userId) return res.status(403).json({ error: "Invalid Token" });
    const journals = await journalService.getJournalsForUser(userId);
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add or update today's journal for a user (one per day), with optional image
router.post("/", upload.single("image"), async (req, res) => {
  console.log('POST /journal body:', req.body);
  if ((req as any).file) {
    console.log('POST /journal file:', (req as any).file.originalname, (req as any).file.mimetype);
  }
  let file;
  try {
    const userId = decodeAuth(req);
    const { journal, formatting } = req.body as { journal?: string; formatting?: any };
    file = (req as any).file;
    // Kontrollera att userId är en giltig ObjectId-sträng
    console.log('POST /journal userId:', userId, 'typeof:', typeof userId);
    const isValidObjectId = userId && typeof userId === 'string' && userId.match(/^[a-f\d]{24}$/i);
    if (!journal) console.log('Validation fail: journal saknas eller tom');
    if (!userId) console.log('Validation fail: userId saknas eller tom');
    if (!isValidObjectId) console.log('Validation fail: userId är inte giltig ObjectId');
    if (!journal || !userId || !isValidObjectId) {
      if (file && file.path) {
        fs.unlink(file.path, () => {});
      }
      return res.status(400).json({ error: "Missing or invalid fields" });
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
    // Se till att formatting alltid är en array
    if (!Array.isArray(parsedFormatting)) {
      parsedFormatting = [];
    }
    const updated = await journalService.upsertTodayJournal(journal, parsedFormatting, userId, imageUrl);
    res.status(201).json(updated);
  } catch (err) {
    if (file && file.path) {
      fs.unlink(file.path, () => {});
    }
    console.error('Journal POST error:', err); // Logga stacktrace
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
