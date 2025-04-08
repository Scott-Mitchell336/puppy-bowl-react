import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/NavBar';

function NewPlayer({ players, setPlayers }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    imageUrl: '',
    status: 'field',
    teamId: ''
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          'https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/teams'
        );
        const result = await response.json();
        setTeams(result.data.teams);
        console.log("Teams - ", result.data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT-PUPPIES/players',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          
        }
      );
      console.log("Form Data - ", formData);
      const result = await response.json();
      if (result.success) {
        setPlayers([...players, result.data.player]);
        navigate('/'); // Redirect to home page after successful save
      }
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <nav className="nav-bar">
        <h1 className="nav-title">Puppy Bowl</h1>
      </nav>
      <div className="new-player-form">
        <h2>Add New Player</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="field">Field</option>
                <option value="bench">Bench</option>
              </select>
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="teamId">Team:</label>
              <select
                id="teamId"
                name="teamId"
                value={formData.teamId}
                onChange={handleChange}
                required
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-actions">
            <button type="submit" className="save-btn">Save Player</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPlayer;