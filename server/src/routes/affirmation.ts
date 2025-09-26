import express from 'express';
import getRandomAffirmation from '../external/affirmations';

const router = express.Router();

/* GET random affirmation. */
router.get('/', function(req, res, next) {
  getRandomAffirmation().then((result) => {
    res.status(result.status).send(result.result);
  })
});

export default router;
