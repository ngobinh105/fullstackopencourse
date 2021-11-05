import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import { useParams } from 'react-router-dom'
import { Patient } from '../types'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { setPatient } from '../state'
import EntryDetails from './Entry'

const PatientInfo = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue()
  const { id } = useParams<{ id: string }>()
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(setPatient(patientFromApi))
      } catch (error) {
        console.log(error)
      }
    }
    void fetchPatient()
  }, [id])
  if (!patient) {
    return <div>loading...</div>
  } else {
    console.log(diagnoses)
    let gender
    if (patient.gender === 'male') {
      gender = 'mars large icon'
    }
    if (patient.gender === 'female') {
      gender = 'venus icon'
    }
    if (patient.gender === 'other') {
      gender = 'genderless icon'
    }
    return (
      <div>
        <h2>
          {patient.name}
          <Icon className={gender}></Icon>
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h4>entries</h4>
        {/* {patient.entries.map((entry) => (
          <div key={entry.id}>
            {entry.date} {entry.description}
          </div>
        ))}
        {patient.entries.find((e) => e.diagnosisCodes) && (
          <ul>
            {patient.entries.map((entry) =>
              entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnoses.find((e) => e.code === code)?.name}
                </li>
              ))
            )}
          </ul>
        )} */}
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    )
  }
}

export default PatientInfo
