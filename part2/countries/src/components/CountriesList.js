import Country from '../components/Country'

const CountriesList = ({ list, searchCountries }) => {
  const countries = list.filter(country => {
    return country.name.toLowerCase().includes(searchCountries.toLowerCase())
  })

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) {
    let country = countries[0]
    return (
        <Country country={country} details={true} />
    )
  }
  return (
    countries.map(country =>
      <Country key={country.name} country={country} details={false} />
    )
  )
}

export default CountriesList