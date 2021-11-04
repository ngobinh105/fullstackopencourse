import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import { useParams } from 'react-router-dom'
import { Patient } from '../types'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { setPatient } from '../state'

const PatientInfo = () => {
  const [{ patient }, dispatch] = useStateValue()
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

  let gender
  if (patient?.gender === 'male') {
    gender = 'mars large icon'
  }
  if (patient?.gender === 'female') {
    gender = 'venus icon'
  }
  if (patient?.gender === 'other') {
    gender = 'genderless icon'
  }
  return (
    <div>
      <h2>
        {patient?.name}
        <Icon className={gender}></Icon>
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  )
}

export default PatientInfo
