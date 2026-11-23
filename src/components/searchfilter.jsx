
import { useState } from 'react'

function SearchFilter({ onSearch, onSort }) {
  const [searchData, setSearchData] = useState({
    title: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  })

  function handleChange(e) {
    const { name, value } = e.target

    setSearchData({
      ...searchData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(searchData)
  }

  function handleReset() {
    const emptyData = {
      title: '',
      minPrice: '',
      maxPrice: '',
      location: ''
    }

    setSearchData(emptyData)
    onSearch(emptyData)
    onSort('default')
  }

  return (
    <section className="search-section">
      <div className="search-heading">
        <h2>Find Your Perfect Hotel</h2>
        <p>Search and explore hotels that match your budget.</p>
      </div>

      <form className="search-container" onSubmit={handleSubmit}>
        <div className="search-box">
          <label>Hotel Name</label>
          <input
            type="text"
            name="title"
            placeholder="Search hotel by name..."
            value={searchData.title}
            onChange={handleChange}
          />
        </div>

        <div className="search-box">
          <label>Minimum Price (₹)</label>
          <input
            type="number"
            name="minPrice"
            placeholder="Min price"
            value={searchData.minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="search-box">
          <label>Maximum Price (₹)</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            value={searchData.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="search-box">
          <label>Location</label>
          <select
            name="location"
            value={searchData.location}
            onChange={handleChange}
          >
            <option value="">All Locations</option>
            <option value="Chennai">Chennai</option>
            <option value="Pondicherry">Pondicherry</option>
            <option value="Coimbatore">Coimbatore</option>
          </select>
        </div>

        <div className="search-box">
          <label>Sort By Price</label>
          <select onChange={(e) => onSort(e.target.value)}>
            <option value="default">Default Order</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          Search Hotels
        </button>

        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </section>
  )
}

export default SearchFilter
