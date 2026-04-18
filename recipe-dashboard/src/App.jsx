import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import HeroDetail from "./HeroDetail";
import "./App.css";

function Dashboard({ heroes }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredHeroes = heroes
    .filter((hero) => hero.name.toLowerCase().includes(search.toLowerCase()))
    .filter((hero) =>
      filter === "All" ? true : hero.biography.alignment === filter
    );

  const avgStrength = heroes.length
    ? Math.round(heroes.reduce((sum, h) => sum + h.powerstats.strength, 0) / heroes.length)
    : 0;

  const avgIntelligence = heroes.length
    ? Math.round(heroes.reduce((sum, h) => sum + h.powerstats.intelligence, 0) / heroes.length)
    : 0;

  const marvelCount = heroes.filter((h) => h.biography.publisher === "Marvel Comics").length;

  const top10Strongest = [...heroes]
    .sort((a, b) => b.powerstats.strength - a.powerstats.strength)
    .slice(0, 10)
    .map((h) => ({ name: h.name, strength: h.powerstats.strength }));

  const alignmentData = [
    { name: "Heroes", value: heroes.filter((h) => h.biography.alignment === "good").length },
    { name: "Villains", value: heroes.filter((h) => h.biography.alignment === "bad").length },
    { name: "Neutral", value: heroes.filter((h) => h.biography.alignment === "neutral").length },
  ];

  const PIE_COLORS = ["#4ade80", "#f87171", "#facc15"];

  return (
    <div className="app">
      <header className="header">
        <h1>Superhero Database</h1>
        <p className="subtitle">Explore 731 heroes & villains from Marvel and DC</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Characters</span>
          <span className="stat-value">{heroes.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Strength</span>
          <span className="stat-value">{avgStrength}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Intelligence</span>
          <span className="stat-value">{avgIntelligence}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Marvel Characters</span>
          <span className="stat-value">{marvelCount}</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2 className="chart-title">Top 10 Strongest Characters</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top10Strongest} margin={{ top: 10, right: 10, left: -10, bottom: 60 }}>
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} angle={-45} textAnchor="end" interval={0} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#1a0000", border: "1px solid #3a0000", color: "#fff" }} />
              <Bar dataKey="strength" fill="#e63946" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Alignment Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={alignmentData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {alignmentData.map((entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1a0000", border: "1px solid #3a0000", color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search heroes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Alignments</option>
          <option value="good">Heroes</option>
          <option value="bad">Villains</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      <p className="results-count">{filteredHeroes.length} characters found</p>

      <div className="hero-list">
        {filteredHeroes.map((hero) => (
          <Link to={`/hero/${hero.id}`} key={hero.id} className="hero-link">
            <div className="hero-card">
              <img className="hero-img" src={hero.images.sm} alt={hero.name} />
              <div className="hero-info">
                <span className="hero-name">{hero.name}</span>
                <span className="hero-publisher">{hero.biography.publisher || "Unknown"}</span>
              </div>
              <div className="hero-stats">
                <span className="badge">STR {hero.powerstats.strength}</span>
                <span className="badge">INT {hero.powerstats.intelligence}</span>
                <span className="badge">SPD {hero.powerstats.speed}</span>
              </div>
              <span className={`alignment-tag ${hero.biography.alignment}`}>
                {hero.biography.alignment}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await fetch(
        "https://akabab.github.io/superhero-api/api/all.json"
      );
      const data = await response.json();
      setHeroes(data);
    };
    fetchHeroes();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard heroes={heroes} />} />
      <Route path="/hero/:id" element={<HeroDetail heroes={heroes} />} />
    </Routes>
  );
}

export default App;