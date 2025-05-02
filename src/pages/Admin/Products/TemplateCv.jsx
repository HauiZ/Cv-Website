import React from "react";
import { useState } from "react";
export default function CvCard({ data, hoverContent }) {
  const [isHovered, setIsHovered] = useState(false);

  const { id, name, propoties, url, fileUrl } = data || {};

  // Parse the propoties properly, handling different formats
  let tags = [];
  try {
    // First check if it's already a proper array
    if (Array.isArray(propoties)) {
      tags = propoties;
    }
    // Check if it's a JSON string (starts with '[' and ends with ']')
    else if (
      typeof propoties === "string" &&
      propoties.trim().startsWith("[") &&
      propoties.trim().endsWith("]")
    ) {
      tags = JSON.parse(propoties);
    }
    // Fallback to comma-separated string
    else if (typeof propoties === "string") {
      tags = propoties.split(",").map((tag) => tag.trim());
    }
  } catch (error) {
    console.error("Error parsing propoties:", error);
    // Fallback in case of parsing error
    if (typeof propoties === "string") {
      tags = propoties.split(",").map((tag) => tag.trim());
    }
  }

  // Filter out any empty tags
  tags = tags.filter((tag) => tag && tag.trim() !== "");

  const visibleTags = tags.slice(0, 2);
  const hiddenTagsCount = tags.length - visibleTags.length;

  const imageUrl = fileUrl || "";

  return (
    <div
      className="w-[23rem] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="bg-gray-200 h-[30rem] flex items-center justify-center cursor-pointer relative">
        <img
          src={imageUrl}
          alt="CV Preview"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Properties */}
      <div className="flex gap-2 p-2 justify-end bg-white border-t">
        {visibleTags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#BCA4FF] text-white px-3 py-1 rounded-md text-sm font-medium"
          >
            {tag}
          </span>
        ))}
        {hiddenTagsCount > 0 && (
          <span className="flex items-center justify-center bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
            +{hiddenTagsCount}
          </span>
        )}
      </div>

      {/* Name */}
      <div className="p-3 flex flex-col gap-2">
        <div className="text-lg font-bold text-gray-900">
          {name || "CV Name"}
        </div>
      </div>
      {isHovered && hoverContent && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/30 h-[30rem]">
          {hoverContent}
        </div>
      )}
    </div>
  );
}
