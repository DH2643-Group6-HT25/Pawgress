import express from 'express'
import * as todoService from '../service/todoService'
import { decodeAuth } from '../utils/authUtils'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const todos = await todoService.getTodosForUser(userId)
    res.json(todos)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { todo } = req.body as { todo?: string }
    if (!todo) return res.status(400).json({ error: 'todo required' })

    const created = await todoService.createTodoAtTop(todo, userId)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const { todo, done } = req.body as { todo?: string; done?: boolean }
    const updated = await todoService.editTodo(id, { todo, done })
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/order', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const { order } = req.body as { order?: number }
    if (order == null) return res.status(400).json({ error: 'order required' })

    const updated = await todoService.updateTodoOrder(id, userId, order)
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.put('/reorder', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { items } = req.body as { items?: { id: string; order: number }[] }
    if (!Array.isArray(items))
      return res.status(400).json({ error: 'items[] required' })

    const todos = await todoService.bulkReorder(userId, items)
    res.json(todos)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const deleted = await todoService.removeTodo(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Todo deleted' })
  } catch (err) {
    next(err)
  }
})

router.post('/:id/complete', async (req, res, next) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const deleted = await todoService.removeTodo(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Todo completed' })
  } catch (err) {
    next(err)
  }
})

export default router
