import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import HotelCard from '../components/hotelcard'
import Pagination from '../components/pagination'

function HotelListPage({ onEdit, onView, searchData, sortOrder }) {
  const hotels = useSelector((state) => state.hotels.list)

  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 3

  const filteredHotels = hotels.filter((hotel) => {
    const matchesName = hotel.title
      .toLowerCase()
      .includes((searchData?.title || '').toLowerCase())

    const matchesMinPrice =
      searchData?.minPrice === '' ||
      searchData?.minPrice === undefined ||
      hotel.price >= Number(searchData.minPrice)

    const matchesMaxPrice =
      searchData?.maxPrice === '' ||
      searchData?.maxPrice === undefined ||
      hotel.price <= Number(searchData.maxPrice)

    const matchesLocation =
      !searchData?.location ||
      hotel.location
        ?.toLowerCase()
        .includes(searchData.location.toLowerCase())

    return (
      matchesName &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesLocation
    )
  })

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortOrder === 'low') return a.price - b.price
    if (sortOrder === 'high') return b.price - a.price
    return 0
  })

  const totalPages = Math.ceil(sortedHotels.length / hotelsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchData, sortOrder, hotels.length])

  const startIndex = (currentPage - 1) * hotelsPerPage
  const currentHotels = sortedHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  )

  return (
    <section className="hotels-section" id="hotels">
      <div className="hotels-heading">
        <h2>Our Featured Hotels</h2>
        <p>Explore our handpicked hotels for your next stay.</p>
      </div>

      {currentHotels.length > 0 ? (
        <div className="hotel-grid">
          {currentHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onEdit={onEdit}
              onView={onView}
            />
          ))}
        </div>
      ) : (
        <p className="no-hotels">
          No hotels found. Try another search!
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  )
}

export default HotelListPage
