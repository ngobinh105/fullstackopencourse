const Persons = ({ persons, searchName }) => {
  return (
    <div>
      {' '}
      {searchName !== ''
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  )
}

export default Persons
