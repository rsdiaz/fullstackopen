import {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const api = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log('effect weather')
    axios
      .get('http://api.weatherstack.com/current', { params: { access_key: api, query: capital } })
      .then(response => {
        setWeather({ ...response.data.current })
      })
  }, [api, capital])
  console.log(weather)
  return (
    <div>
      <h3>Weather</h3>
      <p><b>Temperature: </b>{weather.temperature}</p>
      <p><b>Wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather