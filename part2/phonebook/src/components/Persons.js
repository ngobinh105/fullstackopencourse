const Persons = ({ persons, searchName, onDelete }) => {
  return (
    <div>
      {' '}
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={() => onDelete(person.id)}>delete</button>
          </p>
        ))}
    </div>
  )
}

export default Persons
