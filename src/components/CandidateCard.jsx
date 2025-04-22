import { MapPin, Clock, AlertCircle, Mail, CheckCircle, XCircle } from 'lucide-react';

export const CandidateCard = ({
  candidate,
  onApprove,
  onReject,
  onSendMail,
}) => {
  const getStatusComponent = () => {
    switch (candidate.status) {
      case 'pending':
        return (
          <div className="flex items-center text-amber-500 gap-1">
            <AlertCircle size={18} />
            <span>Chờ xử lý</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center text-green-500 gap-1">
            <CheckCircle size={18} />
            <span>Đồng ý</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-500 gap-1">
            <XCircle size={18} />
            <span>Từ chối</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center bg-white">
      <div className="flex-shrink-0 mr-4">
        <img
          src={candidate.avatarUrl}
          alt={candidate.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="mb-1">
          <h3 className="font-medium text-lg">{candidate.position}</h3>
          <h4 className="text-green-500 font-medium">{candidate.name}</h4>
        </div>

        <div className="flex gap-6 mt-2">
          <div className="flex items-center text-gray-600 gap-1">
            <MapPin size={16} />
            <span className="text-sm">{candidate.location}</span>
          </div>

          <div className="flex items-center text-gray-600 gap-1">
            <Clock size={16} />
            <span className="text-sm">{candidate.experience}</span>
          </div>

          {getStatusComponent()}
        </div>
      </div>

      {candidate.jobCode && (
        <div className="text-xs text-gray-500 self-start bg-gray-50 px-2 py-1 rounded">
          Bài đăng: {candidate.jobCode}
        </div>
      )}

      <div className="flex gap-2 items-center ml-4">
        {candidate.status === 'pending' && (
          <>
            <button
              onClick={() => onApprove(candidate.id)}
              className="rounded-full bg-green-500 text-white flex items-center justify-center w-8 h-8"
              title="Duyệt"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => onReject(candidate.id)}
              className="rounded-full border border-red-500 text-red-500 flex items-center justify-center w-8 h-8"
              title="Từ chối"
            >
              <XCircle size={16} />
            </button>
          </>
        )}

        {(candidate.status === 'approved' || candidate.status === 'rejected') && (
          <button
            onClick={() => onSendMail(candidate.id)}
            className="rounded-md bg-green-100 text-green-600 py-1 px-3 flex items-center gap-1 text-sm"
          >
            <Mail size={14} />
            <span>Mail</span>
          </button>
        )}
      </div>
    </div>
  );
};
