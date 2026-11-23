import './footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Information */}
        <div className="footer-column footer-about">
          <h2>NAMLA<span>TECH</span></h2>
          <p>
            Your trusted platform for exploring hotels,
            discovering locations and managing hotel
            information with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="#hotels">Hotels</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Our Services */}
        <div className="footer-column">
          <h3>Our Services</h3>
          <a href="#hotels">Hotel Management</a>
          <a href="#hotels">Hotel Details</a>
          <a href="#hotels">Location Discovery</a>
          <a href="#hotels">Price Comparison</a>
        </div>

        {/* Contact Information */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>📍 Coimbatore, Tamil Nadu</p>
          <p>✉️ info@namlatech.com</p>
          <p>🌐 www.namlatech.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} NAMLATECH.
          All Rights Reserved.
        </p>
        <p>Designed for a Better Hotel Management Experience.</p>
      </div>
    </footer>
  )
}

export default Footer
