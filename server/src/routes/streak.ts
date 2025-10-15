import express from 'express'
import * as streakService from '../service/streakService'
import { decodeAuth } from '../utils/authUtils'

const router = express.Router()

class NoStreakFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NoStreakFoundError'
  }
}

/* GET users streak info. */
router.get('/', async (req, res) => {
  const userId = decodeAuth(req)
  if (!userId) return res.status(401).json({ error: 'Invalid Token' })

  try {
    const streak = await streakService.getStreak(userId as string)
    if (!streak) {
      throw new NoStreakFoundError(`No streak with user: ${userId}`)
    }
    res.status(200).json({ message: 'Get streak successfully', streak })
  } catch (err: any) {
    if (err instanceof NoStreakFoundError) {
      res.status(404).json({ error: err.message })
    }
    res.status(500).json({ error: err.message || 'Server error' })
  }
  console.log(userId)
})

/*Update users streak info*/
router.post('/update', async (req, res) => {
  const userId = decodeAuth(req)

  if (!userId) return res.status(401).json({ error: 'Invalid Token' })

  try {
    const streak = await streakService.updateStreak(userId as string)
    if (!streak) {
      throw new NoStreakFoundError(`No streak with user: ${userId}`)
    }
    res.status(200).json({ message: 'Update streak successfully', streak })
  } catch (err: any) {
    if (err instanceof NoStreakFoundError) {
      res.status(404).json({ error: err.message })
    }
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

export default router
