import React from "react";

const RequestCard = ({ applicant, onClose, onApprove, onReject }) => {
  if (!applicant) return null;

  const isPending = applicant.status === "PENDING";

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md shadow-md relative min-w-[300px] max-w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-black text-sm hover:text-red-500"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Request Details</h2>
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <p>
            <strong>Id:</strong>{" "}
            <span className="text-gray-500">{applicant.id}</span>
          </p>
          <p>
            <strong>Sender:</strong>{" "}
            <span className="text-gray-500">{applicant.PersonalUser.name}</span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-gray-500">{applicant.status}</span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          {isPending && (
            <button
              onClick={() => onApprove(applicant.id)}
              className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg transition"
            >
              ✓
            </button>
          )}


          {isPending && (
            <button
              onClick={() => onReject(applicant.id)}
              className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
