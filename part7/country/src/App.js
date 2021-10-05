import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(async () => {
    if (name) {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true
          `
        )
        const result = response.data ? response.data[0] : null
        setCountry({ ...result, found: true })
      } catch (error) {
        setCountry({ found: false })
      }
    } else {
      setCountry(null)
    }
  }, [name])
  return country
}

const Country = ({ country }) => {
  console.log('country', country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>
        capital{' '}
        {country.capital.map((cap) => (
          <span>{cap}</span>
        ))}
      </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height='100'
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = async (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
