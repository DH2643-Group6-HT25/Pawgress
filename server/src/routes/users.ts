import express from 'express'
import UserModel from '../model/Users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { decodeAuth } from '../utils/authUtils'
import { getPetByUserId } from '../repository/petRepo'
import { NoTokenError, NoUserFoundError } from '../utils/errorUtils'
import { findUserById } from '../repository/usersRepo'

const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('this is the root of user routes')
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' })

  try {
    const user = await UserModel.findOne({ email })
    if (!user)
      return res.status(401).json({ error: 'Invalid email or password' })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid)
      return res.status(401).json({ error: 'Invalid email or password' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    const pet = await getPetByUserId(user.id)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: process.env?.DOMAIN || 'localhost',
    })

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, email: user.email, id: user._id },
      hasPet: pet ? true : false,
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out' })
})

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password || !name)
    return res.status(400).json({ error: 'All fields required' })

  try {
    const existing = await UserModel.findOne({ email })
    if (existing) return res.status(409).json({ error: 'Email already in use' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ email, name, passwordHash })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: process.env?.DOMAIN || 'localhost',
    })

    res.status(201).json({
      message: 'Signup successful',
      user: { name: user.name, email: user.email, id: user._id },
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Signup failed' })
  }
})

router.get('/token', async (req, res) => {
  try {
    const userId = decodeAuth(req)
    if (!userId) throw new NoTokenError('')

    const user = findUserById(userId)
    if (!user) throw new NoUserFoundError('')

    res.status(200).json({ ok: true })
  } catch (err) {
    res.clearCookie('token')
    if (err instanceof NoTokenError) {
      res.status(401).json({ error: 'Invalid Token' })
    } else if (err instanceof NoUserFoundError) {
      res.status(401).json({ error: 'Unauthorized User' })
    } else {
      res.status(401).json({ error: 'Invalid Token' })
    }
  }
})

export default router
