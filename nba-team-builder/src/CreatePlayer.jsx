import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

const POSITIONS = ["PG", "SG", "SF", "PF", "C"];
const PLAYSTYLES = ["Scorer", "Defender", "Playmaker", "Rebounder"];
const TEAMS = ["Lakers", "Celtics", "Warriors", "Bulls", "Heat", "Knicks", "Nets", "Bucks"];

function CreatePlayer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    position: "",
    rating: 75,
    playstyle: "",
    team: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.position || !form.playstyle || !form.team) {
      alert("Please fill out all fields!");
      return;
    }

    const { error } = await supabase.from("players").insert([form]);

    if (error) console.error(error);
    else navigate("/gallery");
  };

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/gallery" className="back-btn">← Back</Link>
        <h1 className="page-title">Create a Player</h1>
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

        <button className="btn-primary" onClick={handleSubmit}>
          Create Player
        </button>
      </div>
    </div>
  );
}

export default CreatePlayer;