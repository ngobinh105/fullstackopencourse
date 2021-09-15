import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  console.log('p', persons)

  const addNewPersons = (e) => {
    e.preventDefault()
    const existed = persons.some(
      (e) => e.name.toLowerCase() === newName.toLowerCase()
    )
    if (existed) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const updateId = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        ).id
        personService
          .update(updateId, { name: newName, number: number })
          .then((updatedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === updateId ? updatedPerson : person
              )
            )
          )
      }
    } else {
      personService
        .create({ name: newName, number: number })
        .then((newPerson) => setPersons([...persons, newPerson]))
    }
    setNumber('')
    setNewName('')
  }
  const onDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}`
      )
    ) {
      personService.deleteUser(id)
      setPersons(persons.filter((person) => person.id !== id))
    }
  }

  useEffect(() => {
    personService.getAll().then((persons) => {
      console.log('personsssssss', persons)
      setPersons(persons)
    })
  }, [])
  return (
    <div>
      <h2>Phone book</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h3>Add a new</h3>
      <PersonForm
        addNewPersons={addNewPersons}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} onDelete={onDelete} />
    </div>
  )
}

export default App
