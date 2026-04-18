import { useParams, Link } from "react-router-dom";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import "./App.css";

function HeroDetail({ heroes }) {
  const { id } = useParams();
  const hero = heroes.find((h) => h.id === parseInt(id));

  if (!hero) return <div className="app"><p style={{ color: "#888", padding: "2rem" }}>Loading...</p></div>;

  const statData = [
    { stat: "Intelligence", value: hero.powerstats.intelligence },
    { stat: "Strength", value: hero.powerstats.strength },
    { stat: "Speed", value: hero.powerstats.speed },
    { stat: "Durability", value: hero.powerstats.durability },
    { stat: "Power", value: hero.powerstats.power },
    { stat: "Combat", value: hero.powerstats.combat },
  ];

  return (
    <div className="app">
      <Link to="/" className="back-btn">← Back to Dashboard</Link>

      <div className="detail-container">
        <div className="detail-left">
          <img src={hero.images.lg} alt={hero.name} className="detail-img" />
          <h1 className="detail-name">{hero.name}</h1>
          <span className={`alignment-tag ${hero.biography.alignment}`}>
            {hero.biography.alignment}
          </span>

          <div className="detail-bio">
            <h2 className="section-title">Biography</h2>
            <div className="bio-row"><span className="bio-label">Full Name</span><span>{hero.biography.fullName || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Publisher</span><span>{hero.biography.publisher || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">First Appearance</span><span>{hero.biography.firstAppearance || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Place of Birth</span><span>{hero.biography.placeOfBirth || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Alter Egos</span><span>{hero.biography.alterEgos || "None"}</span></div>
          </div>

          <div className="detail-bio">
            <h2 className="section-title">Appearance</h2>
            <div className="bio-row"><span className="bio-label">Gender</span><span>{hero.appearance.gender || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Race</span><span>{hero.appearance.race || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Height</span><span>{hero.appearance.height?.[1] || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Weight</span><span>{hero.appearance.weight?.[1] || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Eye Color</span><span>{hero.appearance.eyeColor || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Hair Color</span><span>{hero.appearance.hairColor || "Unknown"}</span></div>
          </div>
        </div>

        <div className="detail-right">
          <h2 className="section-title">Power Stats</h2>
          <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
            {statData.map((s) => (
              <div className="stat-card" key={s.stat}>
                <span className="stat-label">{s.stat}</span>
                <span className="stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          <h2 className="section-title">Stats Radar</h2>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={statData}>
                <PolarGrid stroke="#3a0000" />
                <PolarAngleAxis dataKey="stat" tick={{ fill: "#888", fontSize: 12 }} />
                <Radar dataKey="value" stroke="#e63946" fill="#e63946" fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: "#1a0000", border: "1px solid #3a0000", color: "#fff" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="detail-bio" style={{ marginTop: "1.5rem" }}>
            <h2 className="section-title">Connections</h2>
            <div className="bio-row"><span className="bio-label">Group Affiliation</span><span>{hero.connections.groupAffiliation || "None"}</span></div>
            <div className="bio-row"><span className="bio-label">Relatives</span><span>{hero.connections.relatives || "None"}</span></div>
          </div>

          <div className="detail-bio" style={{ marginTop: "1.5rem" }}>
            <h2 className="section-title">Work</h2>
            <div className="bio-row"><span className="bio-label">Occupation</span><span>{hero.work.occupation || "Unknown"}</span></div>
            <div className="bio-row"><span className="bio-label">Base</span><span>{hero.work.base || "Unknown"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDetail;