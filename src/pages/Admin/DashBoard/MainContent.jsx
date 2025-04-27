import OverViewContent from "./OverViewContent/OverViewContent";
import RequestContent from "./RequestContent";

const MainContent = ({ selectedPage }) => {
  return (
    <div className="p-6 overflow-y-auto h-full bg-gray-100">
      {selectedPage === "overview" && <OverViewContent />}
      {selectedPage === "request" && <RequestContent />}
    </div>
  );
};

export default MainContent;
