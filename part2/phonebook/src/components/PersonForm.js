const PersonForm = ({
  addNewPersons,
  newName,
  setNewName,
  number,
  setNumber,
}) => {
  return (
    <div>
      <form onSubmit={addNewPersons}>
        <div>
          name:{' '}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
