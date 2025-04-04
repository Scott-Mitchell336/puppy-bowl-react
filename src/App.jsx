import { Routes, Route } from "react-router";
import Home from './pages/Home'
import Player from './pages/Player'
import NewPlayer from './pages/NewPlayer'
import './App.css'

// https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/players

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/new-player" element={<NewPlayer />}></Route>
      </Routes>
    </>
  );
}

export default App
