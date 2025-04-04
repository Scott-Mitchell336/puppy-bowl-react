import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../App.css'

function Home() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/players"
      );
      const data = await response.json();
      console.log(data);
      setPlayers(data.data.players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (players.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     <nav className="nav-bar">
  <div className="search-container">
    <input
      type="text"
      placeholder="Search players..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button 
      className="search-btn"
      onClick={() => {
        const filtered = players.filter(player =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPlayers(filtered);
      }}
    >
      Search
    </button>
  </div>
  <h1 className="nav-title">Puppy Bowl</h1>
  <button 
    className="add-player-btn"
    onClick={() => navigate('/new-player')}
  >
    Add New Player
  </button>
</nav>

      <div className="players-list">
        {filteredPlayers.map((player) => (
          <div className="player-card" key={player.id} onClick={() => navigate(`/player/${player.id}`)}>
            <h3>Player Name: {player.name}</h3>
            <p>Breed: {player.breed}</p>
            <img className="player-image" src={player.imageUrl} alt={player.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
