import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error(error);
    else setPost(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setComments(data);
  };

  const handleUpvote = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);

    if (error) console.error(error);
    else setPost({ ...post, upvotes: post.upvotes + 1 });
  };

  const handleComment = async () => {
    if (!newComment) return;

    const { error } = await supabase.from("comments").insert([{
      post_id: parseInt(id),
      content: newComment,
    }]);

    if (error) console.error(error);
    else {
      setNewComment("");
      fetchComments();
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    await supabase.from("comments").delete().eq("post_id", id);
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) console.error(error);
    else navigate("/");
  };

  if (!post) return <div className="app"><p style={{ color: "#888", padding: "2rem" }}>Loading...</p></div>;

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Back to Feed</Link>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to={`/edit/${post.id}`} className="btn-secondary">Edit</Link>
          <button className="btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-meta">Posted on {new Date(post.created_at).toLocaleDateString()}</p>

        {post.image_url && (
          <img src={post.image_url} alt="post" className="post-image" />
        )}

        {post.content && (
          <p className="post-content">{post.content}</p>
        )}

        <button className="upvote-btn" onClick={handleUpvote}>
          ⬆️ Upvote ({post.upvotes})
        </button>
      </div>

      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>

        <div className="comment-form">
          <textarea
            className="form-input form-textarea"
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn-primary" onClick={handleComment}>
            Post Comment
          </button>
        </div>

        <div className="comment-list">
          {comments.length === 0 ? (
            <p style={{ color: "#888" }}>No comments yet. Be the first!</p>
          ) : (
            comments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <p className="comment-content">{comment.content}</p>
                <p className="comment-meta">{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage;