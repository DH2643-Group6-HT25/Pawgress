import { Request } from 'express'
import jwt from 'jsonwebtoken'

/**
 *
 * @param req
 * @returns userId
 */
export function decodeAuth(req: Request) {
  const token = req.cookies?.token ?? null
  if (!token) {
    return null
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded && decoded['userId']) {
      return decoded['userId']
    }
    return null
  } catch (err) {
    console.error(err.message)
    return null
  }
}
