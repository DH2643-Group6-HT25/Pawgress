
import express from "express";
import * as journalService from "../service/journalService";

const router = express.Router();

// Get all journals for a user, sorted by date desc
router.get("/", async (req, res) => {
  const { userId } = req.query as { userId?: string };
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  const journals = await journalService.getJournalsForUser(userId);
  res.json(journals);
});

// Add or update today's journal for a user (one per day)
router.post("/", async (req, res) => {
  const { journal, formatting, user } = req.body as { journal?: string; formatting?: any; user?: string };
  if (!journal || !user) return res.status(400).json({ error: "Missing fields" });
  const updated = await journalService.upsertTodayJournal(journal, formatting, user);
  res.status(201).json(updated);
});

// Edit a journal by ID (only today's journal should be editable in UI)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { journal, formatting } = req.body as { journal?: string; formatting?: any };
  if (!journal) return res.status(400).json({ error: "Missing journal text" });
  const updated = await journalService.editJournal(id, { journal, formatting });
  if (!updated) return res.status(404).json({ error: "Journal not found" });
  res.json(updated);
});

// Delete a journal by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await journalService.removeJournal(id);
  res.json({ message: "Journal deleted" });
});

export default router;
