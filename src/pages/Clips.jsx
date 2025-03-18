import React, { useState, useEffect, useRef } from "react";
import Suggestions from "../components/app/Suggestions";
// import { fetchClips } from "../hooks/useClipUtils";

const Clips = () => {
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const clipRefs = useRef([]);

  const categories = [
    { id: "for-you", name: "For You" },
    { id: "trending", name: "Trending" },
    { id: "following", name: "Following" },
  ];

  useEffect(() => {
    // Fetch clips based on active category
    const getClips = async () => {
      setLoading(true);
      try {
        // Mock data for clips
        const mockClips = [
          {
            id: "1",
            videoUrl: "https://www.example.com/videos/clip1.mp4",
            user: {
              username: "creativecreator",
              avatarUrl: "https://www.example.com/avatars/user1.jpg",
              isVerified: true
            },
            caption: "Check out this amazing sunset! #nature #sunset",
            likes: 15243,
            comments: 342,
            shares: 128
          },
          {
            id: "2",
            videoUrl: "https://www.example.com/videos/clip2.mp4",
            user: {
              username: "techinfluencer",
              avatarUrl: "https://www.example.com/avatars/user2.jpg",
              isVerified: false
            },
            caption: "New tech review! What do you think? #tech #gadgets",
            likes: 8732,
            comments: 215,
            shares: 87
          },
          {
            id: "3",
            videoUrl: "https://www.example.com/videos/clip3.mp4",
            user: {
              username: "travel_enthusiast",
              avatarUrl: "https://www.example.com/avatars/user3.jpg",
              isVerified: true
            },
            caption: "Exploring hidden gems in Barcelona #travel #spain",
            likes: 23456,
            comments: 489,
            shares: 312
          },
          {
            id: "4",
            videoUrl: "https://www.example.com/videos/clip4.mp4",
            user: {
              username: "foodie_adventures",
              avatarUrl: "https://www.example.com/avatars/user4.jpg",
              isVerified: false
            },
            caption: "The best pasta in town! #food #foodie #italianfood",
            likes: 12567,
            comments: 278,
            shares: 156
          },
          {
            id: "5",
            videoUrl: "https://www.example.com/videos/clip5.mp4",
            user: {
              username: "fitness_journey",
              avatarUrl: "https://www.example.com/avatars/user5.jpg",
              isVerified: true
            },
            caption: "Try this quick workout routine! #fitness #workout",
            likes: 9876,
            comments: 198,
            shares: 92
          }
        ];
        setClips(mockClips);
        clipRefs.current = mockClips.map(() => React.createRef());
      } catch (error) {
        console.error("Clips fetch error:", error);
        setClips([]);
      } finally {
        setLoading(false);
      }
    };

    getClips();
  }, [activeCategory]);

  // Implement intersection observer to detect which clip is currently visible
  useEffect(() => {
    if (!clips.length) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // 80% of clip must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setCurrentClipIndex(index);
          // In real app: start playing video for the visible clip, pause others
        }
      });
    }, observerOptions);

    clipRefs.current.forEach((ref, index) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      clipRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [clips.length]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="flex justify-center mx-auto w-full min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full px-6 md:px-0 gap-6">
        {/* Main Content */}
        <div className="flex-1 lg:w-2/3 w-full">
          <div className="flex flex-col w-full max-w-3xl mx-auto py-6">
            {/* Category Selection */}
            <div className="mb-6 flex justify-center">
              <div className="flex space-x-4 pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 font-medium transition ${
                      activeCategory === category.id
                        ? "text-indigo-500 border-b-2 border-indigo-500"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}

            {/* Clips Feed - Vertical Scrolling */}
            {!loading && clips.length > 0 && (
              <div className="snap-y snap-mandatory h-[calc(100vh-130px)] overflow-y-scroll no-scrollbar">
                {clips.map((clip, index) => (
                  <div 
                    key={clip.id}
                    ref={clipRefs.current[index]}
                    data-index={index}
                    className="snap-start h-full w-full flex flex-col relative mb-1"
                  >
                    {/* Video Container */}
                    <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
                      {/* This would be a video player in a real implementation */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">📱</div>
                          <p className="text-lg">Video {clip.id}</p>
                        </div>
                      </div>

                      {/* Right Side Controls */}
                      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
                        <button className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-white text-xs mb-1">{formatNumber(clip.likes)}</span>
                        </div>

                        <button className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-white text-xs mb-1">{formatNumber(clip.comments)}</span>
                        </div>

                        <button className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                          </svg>
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-white text-xs mb-1">{formatNumber(clip.shares)}</span>
                        </div>

                        <button className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 flex items-center justify-center text-white">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          </svg>
                        </button>
                      </div>

                      {/* Bottom Info */}
                      <div className="absolute bottom-0 left-0 right-12 p-4 bg-gradient-to-t from-black to-transparent">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                            {/* User Avatar */}
                            <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white">
                              {clip.user.username.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium flex items-center">
                              {clip.user.username}
                              {clip.user.isVerified && (
                                <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                              )}
                            </p>
                          </div>
                          <button className="px-4 py-1 rounded border border-white text-white text-sm">
                            Follow
                          </button>
                        </div>
                        <p className="text-white mb-2">{clip.caption}</p>
                        <div className="flex items-center">
                          <div className="flex items-center text-white text-sm">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 3v10m0 0l-3.5-3.5M12 13l3.5-3.5M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4"></path>
                            </svg>
                            <span>Original Audio</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Clips */}
            {!loading && clips.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-400">
                  No clips found in this category
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="hidden lg:block lg:w-1/3">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Clips;