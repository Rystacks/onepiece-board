import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  const handleSubmit = async () => {
    if (!form.title) {
      alert("Please add a title!");
      return;
    }

    const { error } = await supabase.from("posts").insert([{
      title: form.title,
      content: form.content,
      image_url: form.image_url,
      upvotes: 0,
    }]);

    if (error) console.error(error);
    else navigate("/");
  };

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1 className="page-title">Create a Post</h1>
      </div>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            className="form-input"
            type="text"
            placeholder="What's your post about?"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Share your thoughts..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            className="form-input"
            type="text"
            placeholder="Paste an image link..."
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
        </div>

        <button className="btn-primary" onClick={handleSubmit}>
          Post It!
        </button>
      </div>
    </div>
  );
}

export default CreatePost;