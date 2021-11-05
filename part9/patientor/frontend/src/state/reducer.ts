import { State } from './state'
import { Diagnosis, Patient } from '../types'

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }
  | {
      type: 'SET_PATIENT'
      payload: Patient
    }
  | {
      type: 'FETCH_DIAGNOSIS_DATA'
      payload: Diagnosis[]
    }
  | {
      type: 'ADD_NEW_ENTRY'
      payload: Patient
    }
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      }
    case 'FETCH_DIAGNOSIS_DATA':
      return {
        ...state,
        diagnoses: action.payload,
      }
    case 'ADD_NEW_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
        patient: action.payload,
      }
    default:
      return state
  }
}
export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  }
}
export const setPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient,
  }
}

export const setNewPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  }
}
export const setDiagnosis = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'FETCH_DIAGNOSIS_DATA',
    payload: diagnoses,
  }
}

export const setNewEntry = (updatedPatient: Patient): Action => {
  return {
    type: 'ADD_NEW_ENTRY',
    payload: updatedPatient,
  }
}
