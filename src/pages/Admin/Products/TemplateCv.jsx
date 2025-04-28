import React from "react";
import bg from "../../../assets/image/logoNoBg.png";

// Hàm convert link file Drive thành link ảnh
function getDirectImageUrl(driveUrl) {
  if (!driveUrl) return bg;
  const match = driveUrl.match(/\/d\/([^/]+)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return bg;
}

export default function CvCard({ data }) {
  console.log("dataCV>>>>>>>", data?.fileUrl || "");
  const { id, name, propoties, url, fileUrl } = data || {};

  const tags = propoties?.split(",").map((tag) => tag.trim()) || [];
  const visibleTags = tags.slice(0, 2);
  const hiddenTagsCount = tags.length - visibleTags.length;

  const imageUrl = getDirectImageUrl(fileUrl);

  return (
    <div className="w-[23rem] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
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
    </div>
  );
}
