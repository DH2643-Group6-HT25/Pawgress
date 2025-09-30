import express from 'express'
import getRandomAffirmation from '../external/affirmations'

const router = express.Router()

/* GET random affirmation. */
router.get('/', function (req, res, next) {
  getRandomAffirmation().then((result) => {
    res.status(result.status)
    if (result.error && result.status !== 200) {
      res.send(result.error)
    } else {
      res.send(result.content)
    }
  })
})

export default router
