import { useNavigate } from "react-router";

function PlayerCard({ player }) {
  const navigate = useNavigate();

  return (
    <div
      className="player-card"
      key={player.id}
      onClick={() => navigate(`/player/${player.id}`)}
    >
      <h3>Player Name: {player.name}</h3>
      <p>Breed: {player.breed}</p>

      <img
        className="player-card-image"
        src={player.imageUrl}
        alt={player.name}
      />
    </div>
  );
}

export default PlayerCard;