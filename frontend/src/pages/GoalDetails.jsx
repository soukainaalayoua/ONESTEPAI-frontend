import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  BarChart4,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

const GoalDetails = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(
          `https://handsome-mercury-anorak.glitch.me/api/goals/${goalId}`
        );
        setGoal(res.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch goal details. Please try again later.");
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchGoal();
  }, [goalId]);

  const toggleTaskCompletion = async (taskId) => {
    if (!goal) return;

    const updatedTasks = goal.tasks.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );

    const updatedGoal = { ...goal, tasks: updatedTasks };
    setGoal(updatedGoal);

    try {
      await axios.patch(
        `https://handsome-mercury-anorak.glitch.me/api/tasks/${taskId}/toggle`
      );
    } catch (err) {
      setGoal(goal);
      setError("Failed to update task. Please try again.");
      console.log(err);
    }
  };

  const generateReport = async () => {
    if (!goal || !user) return;

    setIsGeneratingReport(true);
    setReport(null);
    console.log(user);
    console.log(user.token);

    try {
      const res = await axios.post(
        `https://handsome-mercury-anorak.glitch.me/api/goals/${goalId}/report`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setReport(res.data.report);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
      console.log(err);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const calculateProgress = () => {
    if (!goal || !goal.tasks.length) return 0;

    const completedTasks = goal.tasks.filter((task) => task.completed).length;
    return Math.round((completedTasks / goal.tasks.length) * 100);
  };

  const getProgressColor = (progress) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
          <Link
            to="/dashboard"
            className="inline-flex items-center text-red-600 hover:text-red-800"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-yellow-50 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Goal not found
          </h3>
          <Link
            to="/dashboard"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {goal.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Target: {formatDate(goal.deadline)}</span>
          </div>

          <p className="text-gray-700 mb-6">{goal.description}</p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
              <span className="text-sm font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {progress}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full ${getProgressColor(progress)}`}
                style={{ width: ` ${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
              <span className="text-sm font-medium text-gray-600">
                {goal.tasks.filter((task) => task.completed).length}/
                {goal.tasks.length} Completed
              </span>
            </div>

            {goal.tasks.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-md text-gray-500 text-center">
                <p>No tasks have been generated for this goal yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {goal.tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`p-4 rounded-md border transition-colors ${
                      task.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start">
                      <button
                        onClick={() => toggleTaskCompletion(task._id)}
                        className={`flex-shrink-0 mt-0.5 ${
                          task.completed
                            ? "text-green-500"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      >
                        <CheckSquare className="h-5 w-5" />
                      </button>
                      <div className="ml-3">
                        <h4
                          className={`font-medium ${
                            task.completed
                              ? "text-green-700 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p
                            className={`mt-1 text-sm ${
                              task.completed
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <div className="flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2 text-blue-600" />
                  AI Progress Report
                </div>
              </h3>

              <button
                onClick={generateReport}
                disabled={isGeneratingReport || goal.tasks.length === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isGeneratingReport || goal.tasks.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isGeneratingReport ? "Generating..." : "Generate Report"}
              </button>
            </div>

            {report ? (
              <div className="bg-blue-50 p-5 rounded-md border border-blue-200">
                <div className="prose prose-blue max-w-none text-gray-700">
                  {report.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md text-gray-500 text-center">
                <p>Generate a report to get AI insights on your progress.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
