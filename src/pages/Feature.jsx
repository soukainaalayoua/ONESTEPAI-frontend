import React from "react";

const Feature = ({ icon: Icon, color, title, text }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:brightness-95 cursor-pointer ${color}`}
    >
      <Icon className="w-10 h-10 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default Feature;
