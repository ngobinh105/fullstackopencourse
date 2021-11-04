import { Gender, NewPatientEntry } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}
const isDob = (dob: string): boolean => {
  return Boolean(Date.parse(dob))
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name:' + name)
  }
  return name
}
const parseDob = (dateOfBirth: string): string => {
  if (!dateOfBirth || !isDob(dateOfBirth) || !isString(dateOfBirth)) {
    throw new Error('Invalid or missing date of birth: ' + dateOfBirth)
  }
  return dateOfBirth
}
const parseSSN = (SSN: unknown): string => {
  if (!SSN || !isString(SSN)) {
    throw new Error('Invalid or missing social security number: ' + SSN)
  }
  return SSN
}
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation: ' + occupation)
  }
  return occupation
}
const parseEntries = (entries: unknown): string[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Invalid or missing entries: ' + entries)
  }
  return entries
}

type Fields = {
  name: unknown
  dateOfBirth: string
  ssn: unknown
  gender: unknown
  occupation: unknown
  entries: unknown
}
const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDob(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  }
  return newEntry
}

export default toNewPatientEntry
