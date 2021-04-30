const Persons = ({ namesToShow, deletePerson }) => {

  const confirmDeletePerson = (id) => {
    const person = namesToShow.find(person => person.id === id)

    if(window.confirm(`Delete ${person.name}?`)) {
      deletePerson(id)
    }
    return
  }

  return (
    <ul>
      {namesToShow.map(person =>
        <li key={person.name}>{person.name} - {person.number} <button onClick={() => confirmDeletePerson(person.id)}>delete</button> </li>
      )}
    </ul>
  )
}

export default Persons