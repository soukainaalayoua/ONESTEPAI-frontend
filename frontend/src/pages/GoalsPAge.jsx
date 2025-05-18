import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get(
          "https://onestepai-backend-production.up.railway.app/api/goals",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setGoals(res.data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };

    if (user?.token) {
      fetchGoals();
    }
  }, [user]);

  const handleDelete = async (goalId) => {
    try {
      await axios.delete(
        `https://onestepai-backend-production.up.railway.app/api/goals/${goalId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setGoals(goals.filter((goal) => goal._id !== goalId));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
      {goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{goal.title}</h2>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/goals/${goal._id}`)}
                >
                  Show Tasks
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/goals/update/${goal._id}`)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(goal._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalsPage;
