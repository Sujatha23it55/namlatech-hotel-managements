
import { useDispatch } from 'react-redux'
import { deleteHotel } from '../redux/hotelslice'

function HotelCard({ hotel, onEdit, onView }) {
  const dispatch = useDispatch()

  function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${hotel.title}?`
    )

    if (confirmDelete) {
      dispatch(deleteHotel(hotel.id))
      alert('Hotel deleted successfully!')
    }
  }

  return (
    <div className="hotel-card">
      <img
        src={hotel.image}
        alt={hotel.title}
        className="hotel-image"
      />

      <div className="hotel-card-content">
        <h3>{hotel.title}</h3>
        <h4>₹{hotel.price} / night</h4>
        <p>{hotel.description}</p>

        <p className="hotel-location">
          📍 {hotel.location}
        </p>

        <div className="hotel-actions">
          <button
            className="view-btn"
            onClick={() => onView(hotel)}
          >
            View Details
          </button>

          <button
            className="edit-btn"
            onClick={() => onEdit(hotel)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
