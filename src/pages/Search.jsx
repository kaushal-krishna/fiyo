import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Suggestions from "../components/app/Suggestions";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");

  const tabs = [
    { id: "for-you", label: "For You" },
    { id: "trending", label: "Trending" },
    { id: "news", label: "News" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchContent = async () => {
      let mockData = [];
      switch (activeTab) {
        case "trending":
          mockData = [
            { topic: "ReactJS", posts: "120K" },
            { topic: "TailwindCSS", posts: "85K" },
            { topic: "AI Revolution", posts: "200K" },
            { topic: "Web Development", posts: "150K" },
          ];
          break;
        case "for-you":
          mockData = [
            { topic: "Your Interests", posts: "50K" },
            { topic: "Recommended", posts: "75K" },
          ];
          break;
        case "news":
          mockData = [
            { topic: "Breaking News", posts: "300K" },
            { topic: "World Events", posts: "180K" },
          ];
          break;
        case "sports":
          mockData = [
            { topic: "Football", posts: "250K" },
            { topic: "Basketball", posts: "200K" },
          ];
          break;
        case "entertainment":
          mockData = [
            { topic: "Movies", posts: "150K" },
            { topic: "Music", posts: "130K" },
          ];
          break;
        default:
          mockData = [];
      }
      setTrendingTopics(mockData);
      setLoading(false);
    };
    fetchContent();
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          username: "user1",
          content: `Found ${searchQuery}!`,
          followers: "10K",
        },
        {
          id: 2,
          username: "user2",
          content: `More about ${searchQuery}`,
          followers: "5K",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center mx-auto w-full">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl px-6 w-full gap-6">
        <div className="flex-1 py-6 lg:w-2/3">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users, topics, or hashtags..."
                className="w-full bg-secondary-bg dark:bg-secondary-bg-dark text-gray-900 dark:text-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            </div>
          </form>

          {!searchQuery && (
            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                    setActiveTab(tab.id);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-500 text-white"
                      : "bg-secondary-bg dark:bg-secondary-bg-dark text-gray-900 dark:text-gray-100 hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {/* Search Results */}
          {!loading && searchQuery && searchResults.length > 0 && (
            <div className="rounded-xl shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Results
              </h2>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center gap-4 py-2 border-b border-gray-200 dark:border-gray-700 last:border-0 cursor-pointer"
                  onClick={() => navigate(`/profile/${result.username}`)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {result.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {result.content}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {result.followers} followers
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !searchQuery && (
            <div className="bg-secondary-bg dark:bg-secondary-bg-dark rounded-xl shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              {trendingTopics.map((trend, index) => (
                <div
                  key={index}
                  className="py-3 border-b border-gray-200 dark:border-gray-700 last:border-0 cursor-pointer"
                  onClick={() => setSearchQuery(trend.topic)}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {trend.topic}
                  </p>
                  <p className="text-sm text-gray-400">{trend.posts} posts</p>
                </div>
              ))}
            </div>
          )}

          {!loading && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400">
                No results found for "{searchQuery}"
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
