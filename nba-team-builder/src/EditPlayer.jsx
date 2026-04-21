import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

const POSITIONS = ["PG", "SG", "SF", "PF", "C"];
const PLAYSTYLES = ["Scorer", "Defender", "Playmaker", "Rebounder"];
const TEAMS = ["Lakers", "Celtics", "Warriors", "Bulls", "Heat", "Knicks", "Nets", "Bucks"];

function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    position: "",
    rating: 75,
    playstyle: "",
    team: "",
  });

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
    else setForm(data);
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("players")
      .update({
        name: form.name,
        position: form.position,
        rating: form.rating,
        playstyle: form.playstyle,
        team: form.team,
      })
      .eq("id", id);

    if (error) console.error(error);
    else navigate(`/player/${id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this player?");
    if (!confirm) return;

    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (error) console.error(error);
    else navigate("/gallery");
  };

  return (
    <div className="app">
      <div className="page-header">
        <Link to={`/player/${id}`} className="back-btn">← Back</Link>
        <h1 className="page-title">Edit Player</h1>
      </div>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">Player Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter player name..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Position</label>
          <div className="option-buttons">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                className={`option-btn ${form.position === pos ? "selected" : ""}`}
                onClick={() => setForm({ ...form, position: pos })}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Overall Rating: {form.rating}</label>
          <input
            type="range"
            min="50"
            max="99"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
            className="rating-slider"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Playstyle</label>
          <div className="option-buttons">
            {PLAYSTYLES.map((style) => (
              <button
                key={style}
                className={`option-btn ${form.playstyle === style ? "selected" : ""}`}
                onClick={() => setForm({ ...form, playstyle: style })}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Team</label>
          <div className="option-buttons">
            {TEAMS.map((team) => (
              <button
                key={team}
                className={`option-btn ${form.team === team ? "selected" : ""}`}
                onClick={() => setForm({ ...form, team: team })}
              >
                {team}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            Delete Player
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPlayer;