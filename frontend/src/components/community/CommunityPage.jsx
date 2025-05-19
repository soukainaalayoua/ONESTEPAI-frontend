import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios
      .get("https://onestepai-backend-production.up.railway.app/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;

    try {
      const res = await axios.post(
        "https://onestepai-backend-production.up.railway.app/api/posts",
        { content: newPost },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts([res.data, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  return (
    <div className="p-4 space-y-6 bg-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Community OneStepAI</h1>

      <div className="bg-lime-100 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
        <textarea
          className="w-full border rounded-lg p-3 resize-none"
          placeholder="Partager your progress.."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          className="mt-3 bg-purple-800 hover:bg-purple-990 transition text-white px-6 py-2 rounded-xl"
          onClick={handlePost}
        >
          Post
        </button>
      </div>

      <div className="space-y-6">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))}
      </div>
    </div>
  );
};

export default CommunityPage;
