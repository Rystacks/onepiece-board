import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Gallery from "./Gallery";
import CreatePlayer from "./CreatePlayer";
import PlayerDetail from "./PlayerDetail";
import EditPlayer from "./EditPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/create" element={<CreatePlayer />} />
      <Route path="/player/:id" element={<PlayerDetail />} />
      <Route path="/edit/:id" element={<EditPlayer />} />
    </Routes>
  );
}

export default App;