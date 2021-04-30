import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import servicePerson from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    servicePerson
      .getAll()
      .then(initialsPersons => {
        setPersons(initialsPersons)
      })
  }, [])

  const isExistingPerson = (persons, namePerson) => {
    return persons.some(person => person.name === namePerson ? true : false)
  }

  
  const addPerson = (event) => {
    event.preventDefault()
    if (isExistingPerson(persons, newName)) {
      const person = persons.find(person => person.name === newName)
      const confirm = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        const updatePersonObject = { ...person, number: newNumber }
        updatePerson(person.id, updatePersonObject)
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      servicePerson
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }    
  }
  
  const updatePerson = (id, updatePerson) => {
    servicePerson
      .update(id, updatePerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
      })
  }
  
  const deletePerson = (id) => {
    servicePerson
      .remove(id)
      .then(() => {
        const updatePersons = persons.filter(person => person.id !== id)
        setPersons(updatePersons)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
    setShowAll(false)
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person => {
      let toFilter = person.name.toLocaleLowerCase()
      let toSearch = searchName.toLocaleLowerCase()
      return toFilter.includes(toSearch)
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        namesToShow={namesToShow}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App
