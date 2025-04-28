import React, { useState } from "react";
import CvCard from "./CvCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function CvCategoryManager() {
  // Sử dụng object để lưu trữ danh mục động
  const [categories, setCategories] = useState({});
  // Add CV to a specific category
  const handleAddToCategory = (categoryName, cvData) => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };

      // Nếu danh mục chưa tồn tại, tạo mới
      if (!updatedCategories[categoryName]) {
        updatedCategories[categoryName] = [];
      }

      // Thêm CV vào danh mục
      updatedCategories[categoryName].push(cvData);
      return updatedCategories;
    });
  };

  // Delete a category
  const handleDeleteCategory = (categoryName) => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      delete updatedCategories[categoryName];
      return updatedCategories;
    });
  };

  return (
    <div className="p-4">
      {/* Render CvCard và truyền handleAddToCategory */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">CV Templates</h2>
        <CvCard onAddToCategory={handleAddToCategory} />
      </div>

      {/* Hiển thị các danh mục */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(categories).length === 0 ? (
          <div className="col-span-2 text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chưa có danh mục nào được tạo</p>
            <p className="text-sm text-gray-400 mt-1">
              Nhấn vào nút "+" và nhập tên danh mục để tạo mới
            </p>
          </div>
        ) : (
          Object.keys(categories).map((categoryName) => (
            <div key={categoryName} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">{categoryName}</h3>
                <button
                  onClick={() => handleDeleteCategory(categoryName)}
                  className="text-red-500 hover:text-red-700"
                  title="Xóa danh mục"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <ul className="space-y-2">
                {categories[categoryName].map((cv, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-50 rounded flex items-center"
                  >
                    {cv.imageUrl && (
                      <img
                        src={cv.imageUrl}
                        alt="CV thumbnail"
                        className="w-10 h-10 mr-3 object-cover rounded"
                      />
                    )}
                    <span>{cv.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
