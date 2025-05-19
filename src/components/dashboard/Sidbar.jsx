import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Goals", path: "/dashboard/goals", icon: "🎯" },
    { name: "Tasks", path: "/dashboard/tasks", icon: "✅" },
    { name: "Progress", path: "/dashboard/progress", icon: "📈" },
    { name: "Reports", path: "/dashboard/reports", icon: "📊" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 pt-16 bg-gradient-to-b from-purple-50 to-white shadow-lg border-r border-gray-100 p-6 flex flex-col">
      {/* Author/Profile Section */}
      <div className="flex items-center mb-8 p-4 rounded-lg bg-white shadow-sm">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
          <span className="text-xl">👤</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">John Doe</h3>
          <p className="text-sm text-gray-500">Premium Member</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6 text-gray-800 px-4">Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-purple-100 hover:text-purple-700"
              }`
            }
          >
            <span className="mr-3 text-lg">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 ${
              isActive ? "bg-gray-100" : ""
            }`
          }
        >
          <span className="mr-3 text-lg">⚙️</span>
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
