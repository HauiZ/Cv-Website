import { useEffect, useState } from "react";

function Toast({ id, message, type = "success", duration = 1500, onClose }) {
  const [visible, setVisible] = useState(false);
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  useEffect(() => {
    // Delay để toast trượt vào
    const enterTimeout = setTimeout(() => setVisible(true), 10);

    // Auto slide-out sau duration
    const autoCloseTimeout = setTimeout(() => handleClose(), duration);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(autoCloseTimeout);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // đợi animation xong rồi mới xóa
  };

  return (
    <div
      className={`
        flex items-center justify-between gap-4 
        w-72 p-4 rounded text-white shadow-lg transition-all duration-300 transform
        ${bgColor}
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
      `}
    >
      <span className="text-sm">{message}</span>
      <button
        onClick={handleClose}
        className="text-white text-lg leading-none hover:opacity-70"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;
