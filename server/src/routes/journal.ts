
import express from "express";
import JournalModel from "../model/DailyJournals";

const router = express.Router();

// Get all journals for a user, sorted by date desc
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  const journals = await JournalModel.find({ user: userId }).sort({ date: -1 });
  res.json(journals);
});

// Add or update today's journal for a user (one per day)
router.post("/", async (req, res) => {
  const { journal, formatting, user } = req.body;
  if (!journal || !user) return res.status(400).json({ error: "Missing fields" });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  // Upsert: if a journal exists for today, update it; else create new
  const updated = await JournalModel.findOneAndUpdate(
    { user, date: { $gte: today, $lt: tomorrow } },
    { journal, formatting, date: new Date(), user },
    { new: true, upsert: true }
  );
  res.status(201).json(updated);
});

// Edit a journal by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { journal, formatting } = req.body;
  if (!journal) return res.status(400).json({ error: "Missing journal text" });
  const updated = await JournalModel.findByIdAndUpdate(
    id,
    { journal, formatting },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Journal not found" });
  res.json(updated);
});

// Delete a journal by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await JournalModel.findByIdAndDelete(id);
  res.json({ message: "Journal deleted" });
});

export default router;
