import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import GoalCard from "./GoalCard";
import Sidebar from "./Sidbar";
import NewGoalForm from "./NewGoalForm";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const COLORS = ["#10B981", "#F59E0B", "#64748B"];

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get(
          "https://handsome-mercury-anorak.glitch.me/api/goals"
        );
        setGoals(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch goals. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, goal]);
    setShowNewGoalForm(false);
  };

  const updateGoalProgress = (goalId, newProgress) => {
    setGoals((prev) =>
      prev.map((g) => (g._id === goalId ? { ...g, progress: newProgress } : g))
    );
  };

  const deleteGoal = async (goalId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(
        `https://handsome-mercury-anorak.glitch.me/api/goals/${goalId}`
      );
      setGoals((prev) => prev.filter((g) => g._id !== goalId));
      Swal.fire("Deleted!", "Goal deleted successfully.", "success");
    } catch {
      Swal.fire("Error!", "An error occurred while deleting.", "error");
    }
  };

  const handleOpenNewGoalForm = () => {
    if (!user?.isPro && goals.length >= 5) {
      Swal.fire({
        icon: "error",
        title: "Maximum goals reached",
        text: "The free plan allows only 5 goals. Please upgrade.",
        confirmButtonColor: "#10B981",
      }).then((r) => r.isConfirmed && (window.location.href = "/payment"));
      return;
    }
    if (!user?.isPro && goals.length === 4) {
      Swal.fire({
        icon: "warning",
        title: "Almost there!",
        text: "Only one free goal left.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10B981",
      }).then(() => setShowNewGoalForm(true));
      return;
    }
    setShowNewGoalForm(true);
  };

  // Metrics
  const completed = goals.filter((g) => g.progress === 100).length;
  const inProgress = goals.filter(
    (g) => g.progress > 0 && g.progress < 100
  ).length;
  const notStarted = goals.filter((g) => g.progress === 0).length;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Not Started", value: notStarted },
  ];
  const lineData = goals.map((g, i) => ({
    goalNumber: i + 1,
    completedTasks: g.tasks.filter((t) => t.completed).length,
  }));

  return (
    <div className="min-h-screen bg-lime-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-purple-900">{user?.name || "User"}</span>
          </h1>
          <p className="text-gray-500 mt-1">Track and achieve your goals</p>
        </div>
        <button
          onClick={handleOpenNewGoalForm}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition shadow-md hover:shadow-lg"
        >
          <PlusCircle className="h-5 w-5 mr-2" /> New Goal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: "Total Goals",
            value: goals.length,
            color: "bg-indigo-100 text-center text-indigo-800",
            icon: "📊",
          },
          {
            label: "Completed",
            value: completed,
            color: "bg-green-100 text-center text-green-800",
            icon: "✅",
          },
          {
            label: "In Progress",
            value: inProgress,
            color: "bg-amber-100 text-center text-amber-800",
            icon: "⏳",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} rounded-xl p-5 shadow-sm hover:shadow-md transition`}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">{card.label}</h4>
              <span className="text-xl">{card.icon}</span>
            </div>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Goals Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="bg-lime-50 rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
            <h3 className="text-lg font-medium text-center mb-4 text-gray-700">
              Completion Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} goals`, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-lime-50 rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
            <h3 className="text-lg font-medium text-center mb-4 text-gray-700">
              Tasks per Goal
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="goalNumber"
                  label={{
                    value: "Goal #",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />
                <YAxis
                  allowDecimals={false}
                  label={{ value: "Tasks", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [`${value} tasks`, "Completed"]}
                  labelFormatter={(value) => `Goal ${value}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completedTasks"
                  stroke="#10B981"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Completed Tasks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-lime-50 rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
            <h3 className="text-lg font-medium text-center mb-4 text-gray-700">
              Status Summary
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => [`${value} goals`, "Count"]} />
                <Legend />
                <Bar dataKey="value" name="Goals" radius={[6, 6, 0, 0]}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New Goal Form Modal */}
      {showNewGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-200 animate-pop-in">
            <NewGoalForm
              onAddGoal={addGoal}
              onCancel={() => setShowNewGoalForm(false)}
            />
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Goals
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-lg text-center">
            <p className="text-lg">
              You don't have any goals yet. Create your first goal to get
              started!
            </p>
            <button
              onClick={handleOpenNewGoalForm}
              className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md"
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Create Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal._id}
                goal={goal}
                onDelete={deleteGoal}
                onUpdateProgress={updateGoalProgress}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
