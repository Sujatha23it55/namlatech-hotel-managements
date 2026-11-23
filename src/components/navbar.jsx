
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>NAMLATECH</h2>
        <span>Hotel Management</span>
      </div>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="#hotels">Hotels</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <button className="add-hotel-btn">
        + Add Hotel
      </button>
    </nav>
  );
}

export default Navbar;
