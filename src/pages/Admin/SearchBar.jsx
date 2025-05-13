import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../../contexts/SearchContext";

export default function SearchBar({api, contentDropdown, params}) {
  const { searchTerm ,setSearchTerm } = useSearch();
  const data = "oke"
  // const { data, refetch } = useCustomFetch(api, [params]);
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Input"
          className="pl-10 pr-3 py-1 bg-[#c5c7cb] [#7c7878] rounded border focus:outline-none text-black transition-all duration-200 hover:ring-2 hover:ring-blue-300 hover:bg-white focus:bg-white"
          onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="w-fitbg-amber-400 absolute top-[2.75em] z-20">
          {contentDropdown}
        </div>
      )
      }
    </div>
  );
}
