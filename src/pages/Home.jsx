import { useState, useEffect } from "react";
//import { useNavigate } from "react-router";
import Navbar from "../components/NavBar.jsx";
import PlayerCard from "../components/PlayerCard.jsx";
import "../App.css";

function Home({setPlayers, players}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);

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

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/teams"
      );
      const data = await response.json();
      setTeams(data.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const getTeamName = (teamId) => {
    if (!teamId) return '';  // Return empty string if teamId is undefined
    const team = teams.find(team => team.id === teamId);
    return team ? team.name : '';
  };
  const filteredPlayers = players?.filter((player) => {
    console.log("Player - ", player);
    if (!player) return false; 
    const teamName = getTeamName(player.teamId);
    return player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           player.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
           player.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
           teamName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!players || !players.length) {
    return <div>Loading...</div>;
  }
  // if (!players || filteredPlayers.length === 0) {
  //   return <div>Loading...</div>;
  // }

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
