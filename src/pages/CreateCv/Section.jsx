import React from "react";

export default function Section({ title, lines = 3 }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-green-700 mb-1 border-b border-green-700">
        {title}
      </h3>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-6 bg-gray-100 border border-gray-300 rounded mb-1 px-2"
        />
      ))}
    </div>
  );
}