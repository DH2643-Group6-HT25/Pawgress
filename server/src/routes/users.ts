import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the root of user routes')
});

export default router;
