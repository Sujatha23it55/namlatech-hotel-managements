
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addHotel, updateHotel } from '../redux/hotelslice'

function HotelForm({ editingHotel, setEditingHotel }) {
  const dispatch = useDispatch()

  const initialHotel = {
    title: '',
    description: '',
    price: '',
    latitude: '',
    longitude: '',
    location: ''
  }

  const [hotel, setHotel] = useState(initialHotel)
  const [preview, setPreview] = useState('')

  // Load existing hotel details when Edit is clicked
  useEffect(() => {
    if (editingHotel) {
      setHotel({
        title: editingHotel.title || '',
        description: editingHotel.description || '',
        price: editingHotel.price || '',
        latitude: editingHotel.latitude || '',
        longitude: editingHotel.longitude || '',
        location: editingHotel.location || ''
      })

      setPreview(editingHotel.image || '')
    } else {
      setHotel(initialHotel)
      setPreview('')
    }
  }, [editingHotel])

  // Handle text inputs
  function handleChange(e) {
    const { name, value } = e.target

    setHotel({
      ...hotel,
      [name]: value
    })
  }

  // Convert image into Base64 format
  function handleImage(e) {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      e.target.value = ''
      return
    }

    // Keep image size within 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert('Please select an image smaller than 2 MB.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result)
    }

    reader.onerror = () => {
      alert('Unable to load image. Please try again.')
    }

    reader.readAsDataURL(file)
  }

  // Submit hotel details
  function handleSubmit(e) {
    e.preventDefault()

    if (!preview) {
      alert('Please select a hotel image.')
      return
    }

    const hotelData = {
      ...hotel,
      price: Number(hotel.price),
      latitude: Number(hotel.latitude),
      longitude: Number(hotel.longitude),
      image: preview
    }

    if (editingHotel) {
      dispatch(
        updateHotel({
          ...hotelData,
          id: editingHotel.id
        })
      )

      alert('Hotel updated successfully!')
      setEditingHotel(null)
    } else {
      dispatch(addHotel(hotelData))
      alert('Hotel added successfully!')
    }

    setHotel(initialHotel)
    setPreview('')
    e.target.reset()
  }

  // Cancel editing
  function handleCancel() {
    setEditingHotel(null)
    setHotel(initialHotel)
    setPreview('')
  }

  return (
    <section className="form-section" id="add-hotel">

      <div className="form-heading">
        <h2>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>

        <p>
          {editingHotel
            ? 'Update the hotel information below.'
            : 'Enter the hotel information below.'}
        </p>
      </div>

      <form className="hotel-form" onSubmit={handleSubmit}>

        <label>Hotel Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required={!editingHotel}
        />

        {preview && (
          <img
            src={preview}
            alt="Hotel preview"
            className="image-preview"
          />
        )}

        <label>Hotel Title</label>

        <input
          type="text"
          name="title"
          placeholder="Enter hotel name"
          value={hotel.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>

        <textarea
          name="description"
          placeholder="Enter hotel description"
          value={hotel.description}
          onChange={handleChange}
          required
        />

        <label>Price per Night (₹)</label>

        <input
          type="number"
          name="price"
          placeholder="Enter price"
          min="1"
          value={hotel.price}
          onChange={handleChange}
          required
        />

        <label>Location</label>

        <input
          type="text"
          name="location"
          placeholder="Enter hotel location"
          value={hotel.location}
          onChange={handleChange}
          required
        />

        <div className="coordinate-row">

          <div>
            <label>Latitude</label>

            <input
              type="number"
              step="any"
              name="latitude"
              placeholder="Latitude"
              value={hotel.latitude}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Longitude</label>

            <input
              type="number"
              step="any"
              name="longitude"
              placeholder="Longitude"
              value={hotel.longitude}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <button type="submit" className="submit-hotel-btn">
          {editingHotel ? 'Update Hotel' : 'Add Hotel'}
        </button>

        {editingHotel && (
          <button
            type="button"
            onClick={handleCancel}
            className="delete-btn"
          >
            Cancel Edit
          </button>
        )}

      </form>
    </section>
  )
}

export default HotelForm
