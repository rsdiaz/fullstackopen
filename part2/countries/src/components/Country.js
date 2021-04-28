import {useState} from 'react'
import Weather from '../components/Weather'

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
        <Weather capital={country.capital} />
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

export default Country