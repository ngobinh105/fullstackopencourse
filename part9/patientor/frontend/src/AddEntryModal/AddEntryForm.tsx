import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useStateValue } from '../state'
import { EntryWithoutId } from '../types'
import {
  DiagnosisSelection,
  TextField,
  NumberField,
} from '../AddPatientModal/FormField'
import { Grid, Button } from 'semantic-ui-react'

// export type EntryFormValue = Omit<Entry, 'id'>
interface Props {
  onSubmit: (values: EntryWithoutId) => void
  onCancel: () => void
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue()
  const [type, setType] = useState('HealthCheck')

  let initialValues: EntryWithoutId = {
    type: 'HealthCheck',
    date: '',
    description: '',
    diagnosisCodes: [],
    specialist: '',
    healthCheckRating: 0,
  }

  switch (type) {
    case 'HealthCheck':
      initialValues = {
        type: 'HealthCheck',
        date: '',
        description: '',
        diagnosisCodes: [],
        specialist: '',
        healthCheckRating: 0,
      }
      break
    case 'Hospital':
      initialValues = {
        type: 'Hospital',
        date: '',
        description: '',
        diagnosisCodes: [],
        specialist: '',
        discharge: {
          date: '',
          criteria: '',
        },
      }
      break
    case 'OccupationalHealthcare':
      initialValues = {
        type: 'OccupationalHealthcare',
        date: '',
        description: '',
        diagnosisCodes: [],
        specialist: '',
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }
      break

    default:
      break
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: {
          [field: string]: string | { date?: string; criteria?: string }
        } = {}
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        if (values.type === 'Hospital') {
          // errors.discharge = {}
          if (!values.discharge.date && values.discharge.criteria) {
            errors.discharge = { date: requiredError }
          }
          if (!values.discharge.criteria && values.discharge.date) {
            errors.discharge = { criteria: requiredError }
          }
          if (!values.discharge.criteria && !values.discharge.date) {
            errors.discharge = { date: requiredError, criteria: requiredError }
          }
        }
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError
          }
        }
        return errors
      }}
    >
      {({ dirty, setFieldValue, setFieldTouched, isValid, values, errors }) => {
        return (
          <Form className='form ui'>
            <select
              onChange={(e) => {
                setType(e.target.value)
              }}
            >
              <option value='HealthCheck'>HealthCheck</option>
              <option value='Hospital'>Hospital</option>
              <option value='OccupationalHealthcare'>
                OccupationalHealthcare
              </option>
            </select>

            <Field
              label='Date'
              placeholder='Date'
              name='date'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            {type === 'HealthCheck' && (
              <Field
                label='Health Check Rating'
                name='healthCheckRating'
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {type === 'Hospital' && (
              <Field
                label='Discharge date'
                placeholder='Date'
                name='discharge.date'
                component={TextField}
              />
            )}
            {type === 'Hospital' && (
              <Field
                label='Discharge criteria'
                placeholder='Criteria'
                name='discharge.criteria'
                component={TextField}
              />
            )}
            {type === 'OccupationalHealthcare' && (
              <Field
                label='Employer Name'
                placeholder='Employer Name'
                name='employerName'
                component={TextField}
              />
            )}
            {type === 'OccupationalHealthcare' && (
              <Field
                label='Sickleave start date'
                placeholder='Start date'
                name='sickLeave.startDate'
                component={TextField}
              />
            )}
            {type === 'OccupationalHealthcare' && (
              <Field
                label='Sickleave end date'
                placeholder='End date'
                name='esickLeave.endDate'
                component={TextField}
              />
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}
export default AddEntryForm
