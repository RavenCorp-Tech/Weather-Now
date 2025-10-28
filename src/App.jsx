import React, { useState } from 'react'
import Search from './components/Search'
import WeatherCard from './components/WeatherCard'

export default function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchWeather(city) {
    setLoading(true)
    setError(null)
    setWeather(null)
    try {
      // Geocoding - get lat/lon for the city
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      )
      const geo = await geoRes.json()
      if (!geo.results || geo.results.length === 0) {
        throw new Error('City not found')
      }
      const { latitude, longitude, name, country } = geo.results[0]

      // Current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
      )
      const data = await weatherRes.json()
      if (!data.current_weather) throw new Error('No weather data')

      setWeather({
        city: `${name}, ${country}`,
        temp: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddir: data.current_weather.winddirection,
        weathercode: data.current_weather.weathercode,
        time: data.current_weather.time
      })
    } catch (err) {
      setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Weather Now</h1>
        <p>Quick current weather for any city (Open-Meteo)</p>
      </header>

      <main>
        <Search
          value={query}
          onChange={setQuery}
          onSearch={() => fetchWeather(query)}
          loading={loading}
        />

        {error && <div className="error">{error}</div>}

        {weather && <WeatherCard data={weather} />}
      </main>

      <footer>
        <small>Data from Open-Meteo — no API key required.</small>
      </footer>
    </div>
  )
}
