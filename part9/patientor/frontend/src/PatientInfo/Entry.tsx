import React from 'react'
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types'
import { Card, Icon } from 'semantic-ui-react'
import { useStateValue } from '../state'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon className='hospital'></Icon>
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          Discharge: {entry.discharge.date} {entry.discharge.criteria}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((e) => e.code === code)?.name}
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  )
}
const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue()
  const heartColor = ['green', 'olive', 'yellow', 'red']

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon className='user md'></Icon>
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          <Icon
            className={`${heartColor[entry.healthCheckRating]} heart`}
          ></Icon>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((e) => e.code === code)?.name}
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  )
}
const OccupationalEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry
}) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon className='stethoscope'></Icon> Employer:{' '}
          {entry.employerName}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          Sickleave:{' '}
          {entry.sickLeave
            ? `${entry.sickLeave.startDate} --- ${entry.sickLeave.endDate}`
            : 'none'}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((e) => e.code === code)?.name}
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  )
}
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />
    default:
      return assertNever(entry)
  }
}

export default EntryDetails
