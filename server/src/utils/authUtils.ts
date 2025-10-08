import { Request } from 'express'
import jwt from 'jsonwebtoken'

export function decodeAuth(req: Request) {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return null
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (err) {
    console.error(err.message)
    return null
  }
}
