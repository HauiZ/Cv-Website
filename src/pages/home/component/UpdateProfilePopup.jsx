import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaArrowRight } from "react-icons/fa";

function UpdateProfilePopup({ show }) {
  const navigate = useNavigate();
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25">
      {/* Popup box */}
      <div className="relative w-[420px] rounded-2xl bg-white p-6 shadow-2xl overflow-hidden">

        {/* ICON TRANG TRÍ – CHỈ NẰM TRONG POPUP */}
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

          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-2.5 text-white font-medium hover:bg-green-600 transition"
          >
            Cập nhật hồ sơ
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default UpdateProfilePopup;
