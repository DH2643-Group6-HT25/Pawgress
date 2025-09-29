import express from 'express';
import UserModel from '../model/Users';
import bcrypt from 'bcrypt';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the root of user routes')
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email, and password required' });

  try {
    const existing = await UserModel.findOne({ $or: [{ name }, { email }] });
    if (existing)
      return res.status(409).json({ error: 'Name or email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, passwordHash });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
