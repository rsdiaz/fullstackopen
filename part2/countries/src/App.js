import { useEffect, useState } from 'react';
import axios from 'axios'

const Country = ({ country, details }) => {
  const [show, setShow] = useState(details)
  
  if (show) {
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>
        })}
        <img src={country.flag} alt="flag" style={{ width: 150 + 'px' }}></img>
      </div>
    )
  } else {
    return (
      <p>
        {country.name}
        <button onClick={() => setShow(!show)}>show</button>
      </p>
    )
  }
}

const CountriesList = ({ list, searchCountries }) => {
  const countries = list.filter(country => {
    return country.name.toLowerCase().includes(searchCountries.toLowerCase())
  })

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) {
    let country = countries[0]
    return <Country country={country} details={true} />
  }
  return (
    countries.map(country =>
      <Country key={country.name} country={country} details={false} />
    )
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