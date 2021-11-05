import React, { useEffect } from 'react'
import { setNewEntry, useStateValue } from '../state'
import { useParams } from 'react-router-dom'
import { EntryWithoutId, Patient } from '../types'
import { Icon, Button } from 'semantic-ui-react'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { setPatient } from '../state'
import EntryDetails from './Entry'
import AddEntryModal from '../AddEntryModal'

const PatientInfo = () => {
  const [{ patient }, dispatch] = useStateValue()
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>()
  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }
  const openModal = (): void => setModalOpen(true)

  const { id } = useParams<{ id: string }>()
  const submitNewEntry = async (values: EntryWithoutId) => {
    console.log('22', values)
    try {
      console.log('33', values)
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      )
      dispatch(setNewEntry(newPatient))
      closeModal()
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error')
      setError(e.response?.data?.error || 'Unknown error')
    }
  }
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
  }, [dispatch])
  if (!patient) {
    return <div>loading...</div>
  } else {
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
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.date} entry={entry} />
        ))}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    )
  }
}

export default PatientInfo
