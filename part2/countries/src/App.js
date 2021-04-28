import { useEffect, useState } from 'react';
import axios from 'axios'
import CountriesList from './components/CountriesList'


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