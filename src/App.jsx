import { Routes, Route } from "react-router";
import { useState } from 'react';
import Home from './pages/Home'
import Player from './pages/Player'
import NewPlayer from './pages/NewPlayer'
import './App.css'

// https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/players

function App() {

  const [players, setPlayers] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home players={players} setPlayers={setPlayers}/>} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/new-player" element={<NewPlayer setPlayers={setPlayers} players={players} />} /> 
      </Routes>
    </>
  );
}

export default App
