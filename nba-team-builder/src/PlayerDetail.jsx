import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = async () => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error(error);
    else setPlayer(data);
  };

  if (!player) return <div className="app"><p style={{ color: "#888", padding: "2rem" }}>Loading...</p></div>;

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/gallery" className="back-btn">← Back to Squad</Link>
        <h1 className="page-title">Player Details</h1>
        <Link to={`/edit/${player.id}`} className="btn-primary">Edit Player</Link>
      </div>

      <div className="detail-card">
        <div className="detail-rating">{player.rating}</div>
        <h2 className="detail-name">{player.name}</h2>

        <div className="detail-badges">
          <span className="badge-large">{player.position}</span>
          <span className="badge-large">{player.playstyle}</span>
          <span className="badge-large">{player.team}</span>
        </div>

        <div className="detail-info">
          <div className="detail-row">
            <span className="detail-label">Position</span>
            <span>{player.position}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Overall Rating</span>
            <span>{player.rating}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Playstyle</span>
            <span>{player.playstyle}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Team</span>
            <span>{player.team}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created</span>
            <span>{new Date(player.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;