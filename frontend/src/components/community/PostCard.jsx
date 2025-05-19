import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const PostCard = ({ post, setPosts }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const refreshPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts", config);
      setPosts(res.data);
    } catch (err) {
      console.error("Error refreshing posts:", err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/posts/${post._id}/like`,
        {},
        config
      );
      setPosts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p))
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `https://onestepai-backend-production.up.railway.app/api/posts/${post._id}/comment`,
        { text: comment },
        config
      );
      setPosts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p))
      );
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handlePostDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(
        `https://onestepai-backend-production.up.railway.app/api/posts/${post._id}`,
        config
      );
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handlePostEdit = async () => {
    const newContent = window.prompt("Edit your post:", post.content);
    if (!newContent || newContent === post.content) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/api/posts/${post._id}`,
        { content: newContent },
        config
      );
      setPosts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p))
      );
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await axios.delete(
        `http://localhost:3000/api/comments/${commentId}`,
        config
      );
      await refreshPosts();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleCommentEdit = async (comment) => {
    const newText = window.prompt("Edit comment:", comment.text);
    if (!newText || newText === comment.text) return;
    try {
      await axios.put(
        `http://localhost:3000/api/comments/${comment._id}`,
        { text: newText },
        config
      );
      await refreshPosts();
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  return (
    <div className="bg-lime-100 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
      <div className="font-semibold text-xl mb-3 text-purple-950">
        👤 {post.user?.name || "User"}
      </div>
      <div className="mb-3 text-gray-800 text-base">{post.content}</div>
      <div className="text-sm text-gray-600 mb-4">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      {post.user?._id === userId && (
        <div className="mb-4 flex gap-3">
          <button
            className="bg-purple-950 text-white px-3 py-1 text-s rounded-md hover:bg-purple-800 transition"
            onClick={handlePostEdit}
          >
            ✏️
          </button>
          <button
            className="bg-purple-950 text-white px-3 py-1 text-s rounded-md hover:bg-purple-800 transition"
            onClick={handlePostDelete}
          >
            🗑️
          </button>
        </div>
      )}

      <div className="mb-4 flex items-center gap-5">
        <button
          className="bg-purple-950 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
          onClick={handleLike}
        >
          🔥 {post.likes.length} motivee
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-purple-950 text-white px-5 py-2 rounded-md hover:bg-purple-800 transition w-full sm:w-auto"
          onClick={handleComment}
        >
          Send
        </button>
      </div>

      <div className="space-y-4 max-h-72 overflow-y-auto">
        {post.comments.map((c) => (
          <div
            key={c._id}
            className="bg-white p-3 rounded-lg shadow-sm text-gray-900"
          >
            <div className="flex justify-between items-start">
              <div>
                💬 <strong>{c.userId?.name || "User"}</strong>: {c.text}
                <div className="text-xs text-gray-500 mt-1">
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                </div>
              </div>
              {c.userId?._id === userId && (
                <div className="flex gap-2 ml-4">
                  <button
                    className="bg-purple-950 text-white px-2 py-1 rounded-md hover:bg-purple-800 text-s transition"
                    onClick={() => handleCommentEdit(c)}
                  >
                    ✏️
                  </button>
                  <button
                    className="bg-purple-950 text-white px-2 py-1 rounded-md hover:bg-purple-800 text-s transition"
                    onClick={() => handleCommentDelete(c._id)}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
