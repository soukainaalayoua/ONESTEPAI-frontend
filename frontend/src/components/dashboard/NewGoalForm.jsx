import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewGoalForm = ({ onAddGoal, onCancel, currentGoalsCount }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérifier la limite gratuite de 5 goals
    if (currentGoalsCount >= 5) {
      Swal.fire({
        icon: "warning",
        title: "Goal Limit Reached",
        text: "You have reached the limit of 5 goals for the Free Plan. Please upgrade to add more goals.",
        confirmButtonText: "Upgrade Now",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/payment";
        }
      });
      return;
    }

    // Validation des champs
    if (!title.trim() || !description.trim() || !deadline) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://onestepai-backend.salayoua.repl.co/api/goals",
        {
          title,
          description,
          deadline,
        }
      );
      onAddGoal(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create goal. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 relative">
      {/* Bouton fermer */}
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-red-400 hover:text-red-600"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Goal</h2>

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 p-3 rounded mb-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Goal Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="e.g., Learn Spanish"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="Describe your goal in detail..."
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Bouton et spinner */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium transition ${
              isLoading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-800"
            } flex items-center`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {isLoading ? "Creating..." : "Create Goal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewGoalForm;
