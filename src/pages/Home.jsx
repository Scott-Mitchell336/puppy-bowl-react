import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/NavBar.jsx";
import PlayerCard from "../components/PlayerCard.jsx";
import "../App.css";

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
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.breed.toLowerCase().includes(searchTerm.toLowerCase())
);

  if (players.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="players-list">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

export default Home;
