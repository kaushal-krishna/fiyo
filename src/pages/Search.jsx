import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Suggestions from "../components/app/Suggestions";
import { fiyoauthApiBaseUri } from "../constants";
import fiyoAxios from "../utils/fiyoAxios";
import UserCard from "../components/app/UserCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const response = await fiyoAxios.get(
            `${fiyoauthApiBaseUri}/users/search/${searchQuery}`
          );
          setSearchResults(response.data.data || []);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="flex justify-center mx-auto w-full">
      <div className="flex-1 flex flex-col lg:flex-row w-full gap-6">
        <div className="flex-1 lg:w-2/3 py-6">
          <div className="relative mb-6 mx-6 md:mx-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, topics, or hashtags..."
              className="w-full bg-secondary-bg dark:bg-secondary-bg-dark text-gray-900 dark:text-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {/* Search Results */}
          <div className="flex flex-col px-4 gap-6">
            {!loading &&
              searchQuery &&
              searchResults.length > 0 &&
              searchResults.map((result) => <UserCard user={result} />)}
          </div>

          {!loading && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}

          {!loading && !searchQuery && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400">
                Start searching for users, topics, or hashtags...
              </p>
            </div>
          )}
        </div>

        {/* Suggestions Section */}
        <div className="hidden lg:block lg:w-1/3">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Search;
