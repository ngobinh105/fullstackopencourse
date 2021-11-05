import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedPatient = patientService.addEntry(newPatientEntry)
    res.json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})
router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id)
  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})
router.post('/:id/entries', (req, res) => {
  try {
    const patientWithNewEntry = patientService.addNewPatientEntry(
      req.params.id,
      req.body
    )
    res.send(patientWithNewEntry)
  } catch (error) {
    res.sendStatus(400)
  }
})

export default router
