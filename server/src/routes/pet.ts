import express from 'express'
import {
  assignPet,
  feedPet,
  getPet,
  increaseFoodByTodo,
} from '../service/petService'
import { decodeAuth } from '../utils/authUtils'
import {
  NoFoodLeftError,
  NoPetFoundError,
  NoUserFoundError,
} from '../utils/errorUtils'

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

router.patch('/todo-to-food', async (req, res) => {
  const userId = decodeAuth(req)
  try {
    const remainingFood = await increaseFoodByTodo(userId)
    res.status(200).json({ food: { remaining: remainingFood } })
  } catch (err: any) {
    if (err instanceof NoUserFoundError) {
      res.status(403).json({ error: 'Unauthorized User' })
    } else {
      console.error(err.message)
      res.status(500).json({ error: err.message || 'Server error' })
    }
  }
})

router.patch('/feed', async (req, res) => {
  const userId = decodeAuth(req)
  try {
    const petHealth = await feedPet(userId)
    res.status(200).json({ pet: petHealth })
  } catch (err: any) {
    if (err instanceof NoFoodLeftError) {
      res.status(204).json({ error: 'No Food Left' })
    } else if (err instanceof NoUserFoundError) {
      res.status(403).json({ error: 'Unauthorized User' })
    }
  }
})

export default router
