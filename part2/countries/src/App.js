import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [name, setName] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [weather, setWeather] = useState(null)
  const filterList = countriesList.filter((country) =>
    country.name.toLowerCase().includes(name.toLowerCase())
  )

  const getWeather = (capital) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountriesList(response.data)
    })
  }, [])

  useEffect(() => {
    if (
      filterList.length === 1 &&
      weather?.location?.name !== filterList[0].capital
    ) {
      getWeather(filterList[0].capital)
    }
  }, [filterList, weather?.location?.name])
  console.log('tai sao null', weather)
  return (
    <div>
      <label>find countries</label>
      {console.log(process.env.REACT_APP_API_KEY)}
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      {filterList.length <= 10 &&
        filterList.length > 1 &&
        filterList.map((country) => (
          <li>
            {country.name}
            <button
              onClick={() => {
                setName(country.name)
              }}
            >
              show
            </button>
          </li>
        ))}

      {filterList.length === 1 && (
        <div>
          <h1>{filterList[0].name}</h1>
          <p>capital {filterList[0].capital}</p>
          <p>population {filterList[0].population}</p>
          <h2>Spoken languages</h2>
          {filterList[0].languages.map((language) => (
            <li>{language.name}</li>
          ))}
          <img
            src={filterList[0].flag}
            alt='flag'
            width='150'
            height='100'
          ></img>

          <h2>Weather in {filterList[0].capital}</h2>

          <h4>temperature: {weather?.current?.temperature} Celsius</h4>
          <img src={weather?.current?.weather_icons} alt='weather icon'></img>
          <h4>
            wind: {weather?.current?.wind_speed}mph direction{' '}
            {weather?.current?.wind_dir}
          </h4>
        </div>
      )}

      {filterList.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  )
}

export default App
