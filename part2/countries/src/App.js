import { useEffect, useState } from 'react';
import axios from 'axios'

const CountriesList = ({ list, searchCountries }) => {
  const countries = list.filter(country => {
    return country.name.toLowerCase().includes(searchCountries.toLowerCase())
  })

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) {
    return countries.map(country => {
      return (
        <div key={country.name}>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          {country.languages.map(language => {
            return <li key={language.name}>{language.name}</li>
          })}
          <img src={country.flag} alt="flag" style={{width: 150 + 'px'}}></img>
        </div>
      )
    })
  }
  return countries.map(country =>
    <p key={country.name}>{country.name}</p>
  )

}

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFindCountries = (event) => {
    console.log(event.target.value)
    setFilterCountry(event.target.value)
  }


  return (
    <div>
      find countries <input value={filterCountry} onChange={handleFindCountries} />
      <div>
        <ul>
          <CountriesList list={countries} searchCountries={filterCountry} />
        </ul>
      </div>
    </div>
  );
}

export default App;
