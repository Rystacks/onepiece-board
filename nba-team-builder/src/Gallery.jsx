import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

function Gallery() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setPlayers(data);
  };

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Home</Link>
        <h1 className="page-title">My Squad</h1>
        <Link to="/create" className="btn-primary">+ Add Player</Link>
      </div>

      {players.length === 0 ? (
        <div className="empty-state">
          <p>No players yet. Create your first player!</p>
          <Link to="/create" className="btn-primary">Create a Player</Link>
        </div>
      ) : (
        <div className="player-grid">
          {players.map((player) => (
            <Link to={`/player/${player.id}`} key={player.id} className="player-card-link">
              <div className="player-card">
                <div className="player-rating">{player.rating}</div>
                <div className="player-info">
                  <span className="player-name">{player.name}</span>
                  <span className="player-position">{player.position}</span>
                  <span className="player-team">{player.team}</span>
                </div>
                <span className="player-playstyle">{player.playstyle}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;