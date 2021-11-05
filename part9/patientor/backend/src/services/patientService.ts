import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from '../types'
import { v1 as uuid } from 'uuid'

import patients from '../../data/patients'

const id = uuid()

const getEntries = (): PatientEntry[] => {
  return patients
}
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}
const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry,
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}
const findById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id)
  return patient
}
export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
}
