import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import SearchSheet from "../components/music/SearchSheet";
import CustomTopNav from "../layout/items/CustomTopNav";
import { FaGear } from "react-icons/fa6";

const Music = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const SearchBox = () => {
    const [searchText, setSearchText] = useState("");

    const handleClear = () => setSearchText("");
    const handleSearch = () => {
      if (searchText.trim()) {
        console.log("Searching for:", searchText);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div className="h-full w-full">
        <div className="flex flex-row items-center w-full bg-secondary-bg dark:bg-secondary-bg-dark rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 px-2 placeholder-gray-400 dark:placeholder-gray-500"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
            value={searchText}
            placeholder="Search"
            aria-label="Search input"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mx-2"
              aria-label="Clear search"
              title="Clear"
            >
              {searchText ? <FaTimes size={20} /> : <FaSearch size={20} />}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center mx-auto w-full">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full md:px-6 gap-6">
        <div className="flex-1 lg:w-2/3">
          <div className="flex flex-col">
            <CustomTopNav
              prevPage="GoBack"
              midComponent={searchQuery && <SearchBox />}
              rightIcons={
                !searchQuery && [
                  {
                    resource: <FaSearch size={20} />,
                    onClick: () => setSearchQuery(true),
                  },
                  {
                    resource: <FaGear size={20} />,
                    onClick: () => console.log("Settings clicked"), // Updated empty function to log
                  },
                ]
              }
            />
            <div className="flex flex-col px-6 gap-4">
              <h1 className="text-2xl font-bold mb-4">Music</h1>
              <p>This is the music page.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden lg:block lg:w-1/3 bg-blue-700 w-full h-full"></div>
      </div>
    </div>
  );
};

export default Music;
