import express from 'express'
import * as streakService from '../service/streakService'
import { decodeAuth } from '../utils/authUtils'

const router = express.Router()

/* GET users streak info. */
router.get('/', async (req, res) => {
  const userId = decodeAuth(req)

  if (!userId) return res.status(401).json({ error: 'Invalid Token' })

  try {
    const streakInfo = await streakService.getStreak(userId as string)
    const streak = {
      currentStreak: streakInfo.currentStreak,
      bestStreak: streakInfo.bestStreak,
      streakHistory: streakInfo.streakHistory.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      })),
    }

    // transfer date to string for front-end
    res.json({
      message: 'Get streak successfully',
      streak,
    })
  } catch (err) {
    console.error('Get streak error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

export default router
