import { MapPin, Clock, Building, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({
  id = 1, // default id if not provided
  title,
  company,
  location,
  salary,
  applicationDeadline,
  logoUrl
}) => {
  return (
    <div className="job-card flex">
      <div className="flex-shrink-0 mr-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={`${company} logo`} className="w-full h-full object-cover" />
          ) : (
            <Building size={32} className="text-gray-500" />
          )}
        </div>
      </div>

      <div className="flex-grow">
        <Link to={`/job/${id}`}>
          <h3 className="font-medium text-lg text-[#00875a] hover:underline cursor-pointer mb-1">
            {title}
          </h3>
        </Link>

        <p className="text-gray-700 mb-2">{company}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={16} className="mr-1" />
            <span className="text-[#00875a] font-medium">{salary}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Còn {applicationDeadline} ngày để ứng tuyển</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 flex flex-col justify-between items-end">
        <Link to={`/job/${id}`} className="btn-apply">Ứng tuyển</Link>
      </div>
    </div>
  );
};

export default JobCard;
