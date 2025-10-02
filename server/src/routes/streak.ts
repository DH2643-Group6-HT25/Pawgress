import express from "express";
import * as streakService from "../service/streakService";

const router = express.Router();

/* GET users streak info. */
router.get("/streak", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const streak = await streakService.getStreak(userId as string);

    res.json({
      message: "Get streak successfully",
      currentStreak: streak.currentStreak,
      bestStreak: streak.bestStreak,
      history: streak.history,
    });
  } catch (err) {
    console.error("Get streak error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

/*Update users streak info*/
router.post("/streak/update", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const streak = await streakService.updateStreak(userId as string);

    res.json({
      message: "Update streak successfully",
      currentStreak: streak.currentStreak,
      bestStreak: streak.bestStreak,
      history: streak.history,
    });
  } catch (err) {
    console.error("Update streak error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

export default router;
