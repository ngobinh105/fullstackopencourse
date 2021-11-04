import patientData from '../../data/patients.json'
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from '../types'
import { v1 as uuid } from 'uuid'
import toNewPatientEntry from '../utils'

const id = uuid()
const patientEntries: PatientEntry[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry
  object.id = obj.id
  return object
})

const getEntries = (): PatientEntry[] => {
  return patientEntries
}
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  )
}
const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry,
  }
  patientEntries.push(newPatientEntry)
  return newPatientEntry
}
const findById = (id: string): PatientEntry | undefined => {
  const patient = patientEntries.find((p) => p.id === id)
  return patient
}
export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
}
