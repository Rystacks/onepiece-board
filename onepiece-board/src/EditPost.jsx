import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error(error);
    else setForm(data);
  };

  const handleUpdate = async () => {
    if (!form.title) {
      alert("Title is required!");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({
        title: form.title,
        content: form.content,
        image_url: form.image_url,
      })
      .eq("id", id);

    if (error) console.error(error);
    else navigate(`/post/${id}`);
  };

  return (
    <div className="app">
      <div className="page-header">
        <Link to={`/post/${id}`} className="back-btn">← Back</Link>
        <h1 className="page-title">Edit Post</h1>
      </div>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            className="form-input"
            type="text"
            placeholder="Post title..."
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

        <button className="btn-primary" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditPost;