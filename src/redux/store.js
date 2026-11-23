
import { configureStore } from '@reduxjs/toolkit'
import hotelReducer from './hotelslice'

const store = configureStore({
  reducer: {
    hotels: hotelReducer
  }
})

// Save hotel data automatically whenever Redux state changes
store.subscribe(() => {
  const hotels = store.getState().hotels.list

  localStorage.setItem('hotels', JSON.stringify(hotels))
})

export default store
