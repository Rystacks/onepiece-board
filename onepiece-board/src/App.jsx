import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
  );
}

export default App;