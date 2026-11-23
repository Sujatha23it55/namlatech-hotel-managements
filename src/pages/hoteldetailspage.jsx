
import { useState } from 'react'

function HotelDetailsPage({ hotel, onBack }) {
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [loading, setLoading] = useState(false)

  const mapLocation =
    hotel.latitude != null && hotel.longitude != null
      ? `${hotel.latitude},${hotel.longitude}`
      : hotel.location

  // Get user's current location using Geolocation API
  function getCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError(
        'Geolocation is not supported by your browser.'
      )
      return
    }

    setLoading(true)
    setLocationError('')
    setUserLocation(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })

        setLoading(false)
      },
      (error) => {
        setLocationError(error.message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const directionsUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${encodeURIComponent(mapLocation)}`
    : ''

  return (
    <section className="hotel-details-section">

      {/* Back Button */}
      <button className="back-btn" onClick={onBack}>
        ← Back to Hotels
      </button>

      {/* Hotel Details */}
      <div className="hotel-details-card">

        <img
          src={hotel.image}
          alt={hotel.title}
          className="hotel-details-image"
        />

        <div className="hotel-details-content">
          <h1>{hotel.title}</h1>

          <h2>₹{hotel.price} / night</h2>

          <p>{hotel.description}</p>

          <h3>Hotel Information</h3>

          <p>📍 Location: {hotel.location}</p>

          <p>
            🌐 Latitude: {hotel.latitude ?? 'Not available'}
          </p>

          <p>
            🌐 Longitude: {hotel.longitude ?? 'Not available'}
          </p>
        </div>

      </div>

      {/* Hotel Location Section */}
      <div className="hotel-map-section">

        <div className="location-header">
          <div>
            <span className="location-tag">
              OUR LOCATION
            </span>

            <h2>Explore the Hotel Location</h2>

            <p>
              Discover where your next comfortable stay begins.
            </p>
          </div>

          <div className="location-status">
            <span className="status-dot"></span>
            Location Preview
          </div>
        </div>

        <div className="location-layout">

          {/* Google Map */}
          <div className="map-container">
            <iframe
              title="Hotel Location Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location Information */}
          <div className="location-info-card">

            <div className="location-icon">
              📍
            </div>

            <span className="info-label">
              HOTEL ADDRESS
            </span>

            <h3>{hotel.location}</h3>

            <div className="location-divider"></div>

            {/* Get Current Location */}
            <button
              type="button"
              className="directions-btn"
              onClick={getCurrentLocation}
              disabled={loading}
            >
              {loading
                ? 'Getting Location...'
                : 'Get My Current Location'}
            </button>

            {/* Loading Message */}
            {loading && (
              <p>Getting your current location...</p>
            )}

            {/* Error Message */}
            {locationError && (
              <p className="location-error">
                {locationError}
              </p>
            )}

            {/* User Coordinates */}
            {userLocation && (
              <>
                <div className="coordinate-info">
                  <span>Your Current Latitude</span>
                  <strong>{userLocation.latitude}</strong>
                </div>

                <div className="coordinate-info">
                  <span>Your Current Longitude</span>
                  <strong>{userLocation.longitude}</strong>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="directions-btn"
                >
                  Get Directions from My Location ↗
                </a>
              </>
            )}

            <div className="coordinate-info">
              <span>Hotel Latitude</span>
              <strong>{hotel.latitude ?? 'Not provided'}</strong>
            </div>

            <div className="coordinate-info">
              <span>Hotel Longitude</span>
              <strong>{hotel.longitude ?? 'Not provided'}</strong>
            </div>

            {/* Hotel Google Maps Link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`}
              target="_blank"
              rel="noreferrer"
              className="directions-btn"
            >
              View Hotel on Google Maps ↗
            </a>

            <p className="location-note">
              Explore the hotel location on Google Maps.
            </p>

          </div>

        </div>
      </div>

    </section>
  )
}

export default HotelDetailsPage
