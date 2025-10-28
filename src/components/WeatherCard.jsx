import React from 'react'

function weatherCodeToText(code) {
  // Simple mapping for common codes
  const map = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    71: 'Slight snow',
    80: 'Rain showers',
  }
  return map[code] || `Code ${code}`
}

export default function WeatherCard({ data }) {
  return (
    <section className="card">
      <h2>{data.city}</h2>
      <div className="row">
        <div className="big">{data.temp}°C</div>
        <div className="meta">
          <div>{weatherCodeToText(data.weathercode)}</div>
          <div>Wind {data.windspeed} km/h</div>
          <div>Time: {new Date(data.time).toLocaleString()}</div>
        </div>
      </div>
    </section>
  )
}
