import React from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle2, ArrowRight, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GoalCard = ({ goal, onUpdateProgress, onDelete }) => {
  const formattedDate = new Date(goal.deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const completedTasks = goal.tasks.filter((task) => task.completed).length;
  const totalTasks = goal.tasks.length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getProgressColor = () => {
    if (progressPercentage < 25) return "bg-red-500";
    if (progressPercentage < 50) return "bg-orange-500";
    if (progressPercentage < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Update progress when the progress bar is clicked
  const handleProgressUpdate = () => {
    if (onUpdateProgress) {
      onUpdateProgress(progressPercentage + 10); // Example: increment by 10%
    }
  };

  return (
    <motion.div
      className="bg-lime-50 rounded-2xl border border-gray-200 overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ height: "360px" }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {goal.title}
          </h3>
          <button
            onClick={() => onDelete(goal._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 flex-1 overflow-hidden">
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {goal.description}
          </p>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Due: {formattedDate}</span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center text-xs text-gray-700 mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div
              className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
              onClick={handleProgressUpdate}
            >
              <div
                className={`h-2 rounded-full ${getProgressColor()}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Tasks</h4>
            <div className="space-y-1 text-xs">
              {goal.tasks.slice(0, 2).map((task) => (
                <div key={task._id} className="flex items-center">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      task.completed ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                  <p
                    className={`ml-2 truncate ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              ))}
              {goal.tasks.length > 2 && (
                <p className="text-gray-400 italic">
                  +{goal.tasks.length - 2} more
                </p>
              )}
              {goal.tasks.length === 0 && (
                <p className="text-gray-400 italic">No tasks yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <Link
            to={`/goals/${goal._id}`}
            className="text-sm text-purple-950-600 text-purple-600 hover:text-purple-900 flex items-center"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalCard;
