import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

const CREW_IMAGES = [
  "https://i.imgur.com/qSugbfP.jpeg",
  "https://i.imgur.com/gIab3RU.jpeg",
  "https://i.imgur.com/sh8pkIv.jpeg",
  "https://i.imgur.com/POStobb.png",
  "https://i.imgur.com/ZZgRrQC.jpeg",
];

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    fetchPosts();
  }, [orderBy]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order(orderBy, { ascending: false });

    if (error) console.error(error);
    else setPosts(data);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="skull">☠️</div>
        <h1 className="site-title">One Piece Board</h1>
        <p className="site-subtitle">The Straw Hat Crew's favorite forum</p>
        <div className="crew-bar">
          {CREW_IMAGES.map((url, index) => (
            <img key={index} src={url} alt="crew member" className="crew-img" />
          ))}
        </div>
        <Link to="/create" className="btn-primary">+ New Post</Link>
      </header>

      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
        >
          <option value="created_at">Latest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet. Be the first to post!</p>
            <Link to="/create" className="btn-primary">Create a Post</Link>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <Link to={`/post/${post.id}`} key={post.id} className="post-card-link">
              <div className="post-card">
                <img
                  src={CREW_IMAGES[index % CREW_IMAGES.length]}
                  alt="crew"
                  className="post-crew-img"
                />
                <div className="post-card-info">
                  <h2 className="post-title">{post.title}</h2>
                  <div className="post-meta">
                    <span>🕐 {new Date(post.created_at).toLocaleDateString()}</span>
                    <span>⬆️ {post.upvotes} upvotes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;