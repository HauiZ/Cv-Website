import { useState, useEffect } from "react"; // Thêm useState, useEffect
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaArrowRight, FaTimes } from "react-icons/fa"; // Thêm FaTimes cho nút tắt

function UpdateProfilePopup({ show }) {
  const navigate = useNavigate();
  // State nội bộ để kiểm soát hiển thị
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kiểm tra xem trong phiên làm việc này đã hiện popup chưa
    const hasSeenPopup = sessionStorage.getItem("hasSeenUpdateProfilePopup");

    // Chỉ hiện nếu:
    // 1. Component cha yêu cầu (show = true)
    // 2. User chưa từng thấy popup này trong phiên (hasSeenPopup = null/false)
    if (show && !hasSeenPopup) {
      setIsVisible(true);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    // Lưu vào storage là "đã xem" để không hiện lại cho đến khi tắt tab/trình duyệt
    sessionStorage.setItem("hasSeenUpdateProfilePopup", "true");
  };

  const handleUpdate = () => {
    handleClose(); // Cũng đóng và lưu trạng thái
    navigate("/profile");
  };

  // Nếu state nội bộ là false thì không render, bất chấp prop 'show' của cha
  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 backdrop-blur-sm transition-opacity">
      {/* Popup box */}
      <div className="relative w-[420px] rounded-2xl bg-white p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* NÚT TẮT (CLOSE) - Nên có để user tắt nếu không muốn cập nhật ngay */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* ICON TRANG TRÍ */}
        <FaUserEdit className="absolute -top-6 -left-6 text-green-100 text-[120px] pointer-events-none" />
        <FaUserEdit className="absolute -bottom-8 -right-6 text-green-100 text-[140px] rotate-12 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <FaUserEdit className="text-2xl text-green-600" />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bạn chưa cập nhật hồ sơ cá nhân
          </h2>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Hoàn thiện hồ sơ để hệ thống gợi ý{" "}
            <span className="font-medium text-green-600">
              việc làm phù hợp hơn
            </span>
            .
          </p>

          <div className="flex justify-center gap-3">
             {/* Nút chính */}
            <button
              onClick={handleUpdate}
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-2.5 text-white font-medium hover:bg-green-600 transition shadow-lg shadow-green-500/30"
            >
              Cập nhật hồ sơ
              <FaArrowRight />
            </button>
            
            {/* Nút bỏ qua (Option phụ) */}
            <button
                onClick={handleClose}
                className="rounded-lg px-4 py-2.5 text-gray-500 hover:bg-gray-100 font-medium transition"
            >
                Để sau
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default UpdateProfilePopup;