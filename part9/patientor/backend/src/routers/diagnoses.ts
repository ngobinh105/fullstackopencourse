import express from 'express'
import diganoseService from '../services/diganoseService'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diganoseService.getEntries())
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!')
})

export default router
