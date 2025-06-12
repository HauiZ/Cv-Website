import React, { useState, useEffect } from "react";

export default function ColorPicker({ onColorChange }) {
  const [color, setColor] = useState("#990000");
  const [hexValue, setHexValue] = useState("990000");
  const [rgbValues, setRgbValues] = useState({
    red: 153,
    green: 0,
    blue: 0
  });

  // Update RGB when hex color changes
  const handleChangeColor = () => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    setHexValue(hex);
    setRgbValues({
      red: r,
      green: g,
      blue: b
    });
    onColorChange(color);
  }

  // Update hex and color when RGB values change
  const handleRgbChange = (colorName, value) => {
    const newValue = Math.min(255, Math.max(0, parseInt(value) || 0));
    const newRgb = { ...rgbValues, [colorName]: newValue };
    setRgbValues(newRgb);

    const hexString = `#${newRgb.red.toString(16).padStart(2, '0')}${newRgb.green.toString(16).padStart(2, '0')}${newRgb.blue.toString(16).padStart(2, '0')}`;
    setColor(hexString);
  };

  // Update RGB when hex input changes
  const handleHexChange = (value) => {
    let hex = value.replace('#', '').replace(/[^0-9A-Fa-f]/g, '').substring(0, 6);
    setHexValue(hex);

    if (hex.length === 6) {
      setColor(`#${hex}`);
    }
  };

  return (
    <div className="p-4  rounded-lg shadow-md">
      <h2 className="text-green-600 font-semibold mb-4 text-md">
        Chọn màu chủ đề
      </h2>

      <div className="mb-6">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 cursor-pointer"
        />
      </div>

      <div className="flex mb-6">
        <div className="w-full">
          <div className="flex items-center mb-3">
            <label className="w-16 font-medium text-gray-700">Hex:</label>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-2">#</span>
              <input
                type="text"
                value={hexValue}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center mb-3">
            <label className="w-16 font-medium text-gray-700">Red:</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbValues.red}
              onChange={(e) => handleRgbChange('red', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
            />
          </div>

          <div className="flex items-center mb-3">
            <label className="w-16 font-medium text-gray-700">Green:</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbValues.green}
              onChange={(e) => handleRgbChange('green', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
            />
          </div>

          <div className="flex items-center mb-3">
            <label className="w-16 font-medium text-gray-700">Blue:</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbValues.blue}
              onChange={(e) => handleRgbChange('blue', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
            />
          </div>
        </div>

        <div
          className="ml-4 w-24 h-24 border border-gray-300"
          style={{ backgroundColor: color }}
        />
      </div>
      <button className="bg-green-400 text-white hover:text-green-400 hover:bg-white hover:border-green-300 border-2 p-2 rounded-md"
      onClick={handleChangeColor}>Cập nhật</button>
    </div>
  );
}
