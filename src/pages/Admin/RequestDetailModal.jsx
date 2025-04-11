// src/components/RequestDetailModal.jsx
import React from "react";

const RequestDetailModal = ({ request, onClose, onApprove, onReject }) => {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md shadow-md relative min-w-[300px] max-w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-black text-sm hover:text-red-500"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Request Details</h2>
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <p><strong>Id:</strong> <span className="text-gray-500">{request.id}</span></p>
          <p><strong>Sender:</strong> <span className="text-gray-500">{request.sender}</span></p>
          <p><strong>Type:</strong> <span className="text-gray-500">{request.type}</span></p>
          <p><strong>Date:</strong> <span className="text-gray-500">{request.date}</span></p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onApprove(request.id)}
            className="w-10 h-10 bg-green-500 text-white rounded-full text-lg hover:bg-green-600"
          >
            ✓
          </button>
          <button className="px-4 py-1 border rounded hover:bg-gray-200 text-sm">detail</button>
          <button
            onClick={() => onReject(request.id)}
            className="w-10 h-10 bg-red-500 text-white rounded-full text-lg hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailModal;
