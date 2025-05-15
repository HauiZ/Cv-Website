import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import Dropdown from "./OverViewContent/DropdownLayout/DropDown";
import { useSearch } from "../../../contexts/SearchContext";
import { useEffect } from "react";

const Header = ({ setSelectedPage }) => {
  const location = useLocation();
  const { setFinalSearchTerm, setId, id, searchTerm, setSearchTerm } =
    useSearch();
  const handleSubmitSearch = (searchTerm) => {
    if (location.search === "?page=overview") {
      console.log("Search submitted:", searchTerm);
      // Set selected page to "overview" to show the overview page
      setSelectedPage("overview");
      // Store "users" in localStorage to indicate we want to show user content
      localStorage.setItem("where", "users");
      setFinalSearchTerm(searchTerm);
      if (id) {
        setId("");
      }

      // Force localStorage event for same-window updates
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleClick = (userId) => {
    console.log("User card clicked, setting ID:", userId);
    // Set selected page to "overview" to show the overview page
    setSelectedPage("overview");

    // Always ensure we're in "users" mode when clicking a user card
    localStorage.setItem("where", "users");

    // Clear search term to avoid confusion
    setSearchTerm("");
    setFinalSearchTerm("");

    // Set the user ID
    setId(userId);

    // Force localStorage event for same-window updates
    window.dispatchEvent(new Event("storage"));
  };
  
  const layoutDropdown = location.search === "?page=overview" ?<Dropdown handleSubmit={handleClick} /> : <div></div>;

  return (
    <header className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between shadow">
      {/* Navigation buttons */}
      <div className="flex space-x-2">
        <button
          className="bg-white text-black rounded-full px-4 py-1 transition-all duration-300 hover:bg-blue-100 hover:scale-105"
          onClick={() => {
            setSelectedPage("overview");
            localStorage.removeItem("where");
            setSearchTerm(""); // Clear search term when returning to overview
            setFinalSearchTerm(""); // Also clear final search term
            setId(""); // Clear any selected user ID
            // Force localStorage event
            window.dispatchEvent(new Event("storage"));
          }}
        >
          Overview
        </button>
        <button
          className="relative bg-white text-black rounded-full px-4 py-1 transition-all duration-300 hover:bg-blue-100 hover:scale-105"
          onClick={() => {
            setSelectedPage("request")
            setSearchTerm("")
          }}
        >
          Request
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>

      {/* Search + Notifications */}
      <SearchBar
        contentDropdown={layoutDropdown}
        handleSubmit={handleSubmitSearch}
      />
    </header>
  );
};

export default Header;
