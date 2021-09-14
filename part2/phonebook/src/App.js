import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addNewPersons = (e) => {
    e.preventDefault()
    const existed = persons.some(
      (e) => e.name.toLowerCase() === newName.toLowerCase()
    )
    existed
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: number }])
    setNumber('')
    setNewName('')
  }

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
      <Persons persons={persons} searchName={searchName} />
    </div>
  )
}

export default App
