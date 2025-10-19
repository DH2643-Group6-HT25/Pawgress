import { Types } from 'mongoose'
import * as todoRepo from '../repository/todoRepo'
import * as streakService from '../service/streakService'

const toObjId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ObjectId')
  return new Types.ObjectId(id)
}

export async function getTodosForUser(userId: string) {
  const uid = toObjId(userId)
  return todoRepo.findByUser(uid)
}

export async function createTodoAtTop(todo: string, userId: string) {
  console.log('createTodoAtTop called with:', { todo, userId })
  if (!todo?.trim()) throw new Error('todo required')
  const uid = toObjId(userId)
  await todoRepo.updateMany({ userId: uid }, { $inc: { order: 1 } })
  return todoRepo.create({ todo, userId: uid, order: 0 })
}

export async function editTodo(
  id: string,
  patch: { todo?: string; done?: boolean }
) {
  const _id = toObjId(id)
  const update: Record<string, unknown> = {}
  if (patch.todo !== undefined) update.todo = patch.todo
  if (patch.done !== undefined) update.done = !!patch.done
  if (Object.keys(update).length === 0) throw new Error('No updatable fields')
  return todoRepo.findByIdAndUpdate(_id.toString(), { $set: update })
}

export async function updateTodoOrder(
  id: string,
  userId: string,
  order: number
) {
  if (!Number.isFinite(order)) throw new Error('order must be a number')
  const _id = toObjId(id)
  toObjId(userId)
  return todoRepo.findByIdAndUpdate(_id.toString(), { $set: { order } })
}

export async function bulkReorder(
  userId: string,
  updates: { id: string; order: number }[]
) {
  const uid = toObjId(userId)
  const ops = updates.map((u) => ({
    updateOne: {
      filter: { _id: toObjId(u.id), userId: uid },
      update: { $set: { order: u.order } },
    },
  }))
  if (ops.length) await todoRepo.bulkWrite(ops as any[])
  return todoRepo.findByUser(uid)
}

export async function removeTodo(id: string) {
  const _id = toObjId(id)
  return todoRepo.findByIdAndDelete(_id.toString())
}

export async function completeTodo(id: string, userId: string) {
  const _id = toObjId(id)

  await streakService.updateStreak(userId)
  return todoRepo.findByIdAndDelete(_id.toString())
}
