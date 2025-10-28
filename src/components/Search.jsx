import React from 'react'

export default function Search({ value, onChange, onSearch, loading }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city name e.g. London"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch()
        }}
      />
      <button onClick={onSearch} disabled={loading || !value.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}
