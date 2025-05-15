import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../../contexts/SearchContext";
import { useLocation } from "react-router-dom";

export default function SearchBar({ contentDropdown, handleSubmit }) {
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Input"
          className="pl-10 pr-3 py-1 bg-[#c5c7cb] rounded border focus:outline-none text-black transition-all duration-200 hover:ring-2 hover:ring-blue-300 hover:bg-white focus:bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(searchTerm);
            }
          }}
          disabled = {location.search !== "?page=overview"}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-2 text-gray-500"
        />
      </div>
      <FontAwesomeIcon
        icon={faBell}
        className="text-white text-xl cursor-pointer hover:text-yellow-300 transition-all duration-200"
      />
      {searchTerm && (
        <div className="absolute top-[2.75em] z-20">{contentDropdown}</div>
      )}
    </div>
  );
}
