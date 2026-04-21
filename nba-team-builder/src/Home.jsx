import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">
      <div className="home-container">
        <h1 className="home-title">🏀 NBA Team Builder</h1>
        <p className="home-subtitle">Build your ultimate NBA squad from scratch</p>
        <div className="home-buttons">
          <Link to="/create" className="btn-primary">Create a Player</Link>
          <Link to="/gallery" className="btn-secondary">View My Squad</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;