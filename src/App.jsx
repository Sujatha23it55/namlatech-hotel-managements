
import { useState } from 'react'

import Navbar from './components/navbar'
import HeroSection from './components/herosection'
import SearchFilter from './components/searchfilter'
import HotelListPage from './pages/hotellistpage'
import HotelForm from './components/hotelform'
import HotelDetailsPage from './pages/hoteldetailspage'
import Footer from './components/footer'

function App() {
  const [editingHotel, setEditingHotel] = useState(null)
  const [selectedHotel, setSelectedHotel] = useState(null)

  const [searchData, setSearchData] = useState({
    title: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  })

  const [sortOrder, setSortOrder] = useState('default')

  return (
    
    <>
      <Navbar />

      {selectedHotel ? (
        <HotelDetailsPage
          hotel={selectedHotel}
          onBack={() => setSelectedHotel(null)}
        />
      ) : (
        <>
          <HeroSection />

          <SearchFilter
            onSearch={setSearchData}
            onSort={setSortOrder}
          />

          <HotelListPage
            onEdit={setEditingHotel}
            onView={setSelectedHotel}
            searchData={searchData}
            sortOrder={sortOrder}
          />

          <HotelForm
            editingHotel={editingHotel}
            setEditingHotel={setEditingHotel}
          />
        </>
      )}

      <Footer />
    </>
  )
}

export default App
