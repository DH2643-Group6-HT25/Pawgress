import express from 'express'
import * as streakService from '../service/streakService'
import { decodeAuth } from '../utils/authUtils'

const router = express.Router()

/* GET users streak info. */
router.get('/', async (req, res) => {
  const userId = decodeAuth(req)
  console.log('[decodeAuth] decoded user:', userId)

  if (!userId) return res.status(400).json({ error: 'userId required' })

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

    console.log(`streakArrays:`, streak)

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

/*Update users streak info*/
router.post('/update', async (req, res) => {
  const userId = decodeAuth(req)
  console.log('[decodeAuth] decoded user:', userId)
  if (!userId) return res.status(400).json({ error: 'userId required' })

  try {
    const streakInfo = await streakService.updateStreak(userId as string)
    const streak = {
      currentStreak: streakInfo.currentStreak,
      bestStreak: streakInfo.bestStreak,
      streakHistory: streakInfo.streakHistory.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      })),
    }
    console.log(
      `Current streak: ${streak.currentStreak}, Best streak: ${
        streak.bestStreak
      }, Streak History: ${JSON.stringify(streak.streakHistory)}`
    )

    res.json({
      message: 'Update streak successfully',
      streak,
    })
  } catch (err) {
    console.error('Update streak error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

export default router
