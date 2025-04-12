import React, { useState } from "react";
import CvCard from "./CvCard";

export default function CvCategoryManager() {
  const [categories, setCategories] = useState({
    category1: [],
    category2: [],
  });

  // Add CV to a specific category
  const handleAddToCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      updatedCategories[category].push("New CV");
      return updatedCategories;
    });
  };

  return (
    <div>
      {/* Render CvCard and pass the handleAddToCategory */}
      <CvCard onAddToCategory={() => handleAddToCategory("category1")} />
      
      {/* Display Categories */}
      <div>
        <h3>Category 1</h3>
        <ul>
          {categories.category1.map((cv, index) => (
            <li key={index}>{cv}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3>Category 2</h3>
        <ul>
          {categories.category2.map((cv, index) => (
            <li key={index}>{cv}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
