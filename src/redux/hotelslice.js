
import { createSlice } from '@reduxjs/toolkit'
import hotels from '../data/hotels'

const savedHotels = localStorage.getItem('hotels')

const initialHotels = savedHotels
  ? JSON.parse(savedHotels).map((savedHotel) => {
      const defaultHotel = hotels.find(
        (hotel) => hotel.id === savedHotel.id
      )

      return defaultHotel
        ? { ...savedHotel, image: defaultHotel.image }
        : savedHotel
    })
  : hotels

const hotelSlice = createSlice({
  name: 'hotels',

  initialState: {
    list: initialHotels
  },

  reducers: {
    addHotel: (state, action) => {
      state.list.push({
        id: Date.now(),
        ...action.payload
      })
    },

    updateHotel: (state, action) => {
      const index = state.list.findIndex(
        (hotel) => hotel.id === action.payload.id
      )

      if (index !== -1) {
        state.list[index] = action.payload
      }
    },

    deleteHotel: (state, action) => {
      state.list = state.list.filter(
        (hotel) => hotel.id !== action.payload
      )
    }
  }
})

export const {
  addHotel,
  updateHotel,
  deleteHotel
} = hotelSlice.actions

export default hotelSlice.reducer
