import { useState, useEffect } from "react";
import { useParams } from "react-router";

function Player() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/players/${id}`
        );
        const data = await response.json();
        setPlayer(data.data.player);
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="nav-bar">
        
        <h1 className="nav-title">Puppy Bowl</h1>
      </nav>

      <div className="player-details">
        <h1>{player.name}</h1>
        <div className="player-info">
          <img
            src={player.imageUrl}
            alt={player.name}
            className="player-image"
          />
          <div className="player-stats">
            <p>
              <strong>Breed:</strong> {player.breed}
            </p>
            <p>
              <strong>Status:</strong> {player.status}
            </p>
            <p>
              <strong>Team ID:</strong> {player.teamId || "No team assigned"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
