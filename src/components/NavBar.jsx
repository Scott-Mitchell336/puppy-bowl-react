import { useNavigate } from "react-router";

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1 className="nav-title">Puppy Bowl</h1>
      <button
        className="add-player-btn"
        onClick={() => navigate("/new-player")}
      >
        Add New Player
      </button>
    </nav>
  );
}

export default Navbar;