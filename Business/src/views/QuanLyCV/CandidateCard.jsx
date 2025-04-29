import { MapPin, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { MailButton } from './MailButton';

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

  // Xác định nếu avatar màu tối hay màu sáng để điều chỉnh shadow
  const isFemaleAvatar = candidate.avatarUrl.includes('E91E63') ||
                         candidate.avatarUrl.includes('F06292') ||
                         candidate.avatarUrl.includes('EC407A') ||
                         candidate.avatarUrl.includes('D81B60') ||
                         candidate.avatarUrl.includes('C2185B') ||
                         candidate.avatarUrl.includes('880E4F') ||
                         candidate.avatarUrl.includes('AD1457');

  const avatarShadowClass = isFemaleAvatar
    ? 'shadow-[0_0_10px_rgba(233,30,99,0.4)]'
    : 'shadow-[0_0_10px_rgba(33,150,243,0.4)]';

  // Handler for when an email is sent
  const handleEmailSent = (emailData) => {
    if (onSendMail) {
      onSendMail(candidate.id, emailData);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center bg-white hover:shadow-md transition-shadow">
      <div className={`flex-shrink-0 mr-4 w-16 h-16 rounded-full overflow-hidden ${avatarShadowClass} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
        <img
          src={candidate.avatarUrl}
          alt={candidate.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1">
        <div className="mb-1">
          <h3 className="font-medium text-lg">{candidate.position}</h3>
          <h4 className={isFemaleAvatar ? "text-pink-500 font-medium" : "text-blue-500 font-medium"}>{candidate.name}</h4>
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
              className="rounded-full bg-green-500 text-white flex items-center justify-center w-8 h-8 hover:bg-green-600 transition-colors"
              title="Duyệt"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => onReject(candidate.id)}
              className="rounded-full border border-red-500 text-red-500 flex items-center justify-center w-8 h-8 hover:bg-red-50 transition-colors"
              title="Từ chối"
            >
              <XCircle size={16} />
            </button>
          </>
        )}

        {(candidate.status === 'approved' || candidate.status === 'rejected') && (
          <MailButton
            recipient={candidate}
            variant={candidate.status === 'approved' ? 'primary' : 'outline'}
            size="sm"
            onSend={handleEmailSent}
          />
        )}
      </div>
    </div>
  );
};
