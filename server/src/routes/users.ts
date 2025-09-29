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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ error: 'Invalid email or password' });

    // Optionally, you can return a token or user info here
    res.json({ message: 'Login successful', user: { name: user.name, email: user.email, id: user._id } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
