import express from 'express'
import { assignPet, getPet } from '../service/petService'
import { decodeAuth } from '../utils/authUtils'

const router = express.Router()

class NoPetFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NoPetFoundError'
  }
}

router.get('/', async (req, res) => {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'pet id required' })

  try {
    const pet = await getPet(id as string)
    if (!pet) {
      throw new NoPetFoundError(`No pet with id: ${id}`)
    }
    res.status(200).json({ pet })
  } catch (err) {
    if (err instanceof NoPetFoundError) {
      res.status(404).json({ error: err.message })
    }
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

router.post('/create', async (req, res) => {
  const decoded = decodeAuth(req)

  if (decoded && decoded['userId']) {
    const {
      body: { color, name },
    } = req

    try {
      const pet = await assignPet(decoded['userId'], color, name)
      res.status(200).json({ pet })
    } catch (err) {
      res.status(500).json({ error: err.message || 'Server error' })
    }
  } else {
    res.status(401).json({ error: 'Invalid Token' })
  }
})

export default router
