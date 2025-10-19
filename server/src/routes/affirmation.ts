import express from 'express'
import affirmations from '../external/affirmations'

const {
  getRandomAffirmation,
  getAffirmationByCategory,
  getAffirmationCategories,
} = affirmations
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

/* GET affirmation by category. */
router.get('/categories/:category/random', async (req, res) => {
  const { category } = req.params
  try {
    const result = await getAffirmationByCategory(category)
    res.status(result.status)
    if (result.error && result.status !== 200) {
      res.send(result.error)
    } else {
      res.send(result.content)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

/* GET affirmation categories. */
router.get('/categories', async (req, res) => {
  try {
    const result = await getAffirmationCategories()
    res.status(result.status)
    if (result.error && result.status !== 200) {
      res.send(result.error)
    } else {
      res.send(result.content)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

export default router
