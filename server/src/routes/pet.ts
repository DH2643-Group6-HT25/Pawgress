import express from 'express'
import { assignPet, getPet } from '../service/petService'
import { decodeAuth } from '../utils/authUtils'
import { NoPetFoundError, NoUserFoundError } from '../utils/errorUtils'

const router = express.Router()

router.get('/', async (req, res) => {
  const userId = decodeAuth(req)
  if (!userId) return res.status(403).json({ error: 'Invalid Token' })
  try {
    const pet = await getPet(userId)

    res.status(200).json({ pet })
  } catch (err: any) {
    if (err instanceof NoPetFoundError) {
      res.status(200).json({ pet: {} })
    } else if (err instanceof NoUserFoundError) {
      res.status(403).json({ error: 'Unauthorized User' })
    } else {
      console.error(err.message)
      res.status(500).json({ error: err.message || 'Server error' })
    }
  }
})

router.post('/create', async (req, res) => {
  const userId = decodeAuth(req)

  if (userId) {
    const {
      body: { color, name },
    } = req

    try {
      const pet = await assignPet(userId, color, name)
      res.status(200).json({ pet })
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Server error' })
    }
  } else {
    res.status(401).json({ error: 'Invalid Token' })
  }
})

export default router
