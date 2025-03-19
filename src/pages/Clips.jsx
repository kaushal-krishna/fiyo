import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Clips = () => {
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [isLiked, setIsLiked] = useState({});
  const [showLikeAnimation, setShowLikeAnimation] = useState({});
  const [playingStates, setPlayingStates] = useState({});
  const clipRefs = useRef([]);
  const videoRefs = useRef([]);
  const [initialViewCompleted, setInitialViewCompleted] = useState(false);
  const likeAnimationTimeoutRef = useRef({});

  useEffect(() => {
    const getClips = async () => {
      setLoading(true);
      try {
        const mockClips = [
          {
            id: uuidv4(),
            creators: [
              {
                id: "user1",
                username: "creativecreator",
                full_name: "Creative Creator",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                is_verified: true,
                followers_count: 125000,
              },
            ],
            media_key:
              "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            created_at: new Date("2025-02-15T18:30:00"),
            caption: "Check out this amazing sunset!",
            description:
              "Captured this breathtaking sunset at the beach last evening. The colors were unreal!",
            hashtags: "nature,sunset,beach,vibes",
            track: {
              id: "track123",
              title: "Summer Feelings",
              artists: ["Chill Beats"],
              link: "https://soundcloud.com/example/summer-feelings",
            },
            likes_count: 15243,
            comments_count: 342,
            shares_count: 128,
          },
          {
            id: uuidv4(),
            creators: [
              {
                id: "user2",
                username: "techinfluencer",
                full_name: "Tech Influencer",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                is_verified: false,
                followers_count: 89500,
              },
            ],
            media_key:
              "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            created_at: new Date("2025-03-01T12:15:00"),
            caption: "New tech review!",
            description:
              "Reviewing the latest smartphone. Is it worth the hype?",
            hashtags: "tech,gadgets,review,smartphone",
            track: {
              id: "track456",
              title: "Tech Vibes",
              artists: ["Digital Sounds"],
              link: "https://soundcloud.com/example/tech-vibes",
            },
            likes_count: 8732,
            comments_count: 215,
            shares_count: 87,
          },
          {
            id: uuidv4(),
            creators: [
              {
                id: "user3",
                username: "travel_enthusiast",
                full_name: "Travel Enthusiast",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                is_verified: true,
                followers_count: 230000,
              },
            ],
            media_key:
              "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            created_at: new Date("2025-02-28T09:45:00"),
            caption: "Exploring hidden gems in Barcelona",
            description:
              "Found this beautiful little cafe in a narrow street of Barcelona. The city has so many unexpected treasures!",
            hashtags: "travel,spain,barcelona,wanderlust",
            track: {
              id: "track789",
              title: "Spanish Guitar",
              artists: ["Mediterranean Mood"],
              link: "https://soundcloud.com/example/spanish-guitar",
            },
            likes_count: 23456,
            comments_count: 489,
            shares_count: 312,
          },
          {
            id: uuidv4(),
            creators: [
              {
                id: "user4",
                username: "foodie_adventures",
                full_name: "Foodie Adventures",
                avatar: "https://randomuser.me/api/portraits/women/22.jpg",
                is_verified: false,
                followers_count: 112000,
              },
            ],
            media_key:
              "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            created_at: new Date("2025-03-10T20:30:00"),
            caption: "The best pasta in town!",
            description:
              "Just tried this new Italian restaurant and their homemade pasta is to die for! You have to try it!",
            hashtags: "food,foodie,italianfood,pasta,yummy",
            track: {
              id: "track101",
              title: "Italian Dinner",
              artists: ["Culinary Beats"],
              link: "https://soundcloud.com/example/italian-dinner",
            },
            likes_count: 12567,
            comments_count: 278,
            shares_count: 156,
          },
          {
            id: uuidv4(),
            creators: [
              {
                id: "user5",
                username: "fitness_journey",
                full_name: "Fitness Journey",
                avatar: "https://randomuser.me/api/portraits/men/74.jpg",
                is_verified: true,
                followers_count: 98000,
              },
            ],
            media_key:
              "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            created_at: new Date("2025-03-15T06:15:00"),
            caption: "Try this quick workout routine!",
            description:
              "No time for the gym? This 10-minute home workout will get your heart pumping!",
            hashtags: "fitness,workout,homeworkout,healthylifestyle,motivation",
            track: {
              id: "track202",
              title: "Workout Energy",
              artists: ["Fitness Beats"],
              link: "https://soundcloud.com/example/workout-energy",
            },
            likes_count: 9876,
            comments_count: 198,
            shares_count: 92,
          },
        ];

        setIsLiked(
          Object.fromEntries(mockClips.map((clip) => [clip.id, false]))
        );
        setShowLikeAnimation(
          Object.fromEntries(mockClips.map((clip) => [clip.id, false]))
        );

        const initialPlayingStates = {};
        mockClips.forEach((clip) => {
          initialPlayingStates[clip.id] = false;
        });
        setPlayingStates(initialPlayingStates);

        setClips(mockClips);
        clipRefs.current = Array(mockClips.length)
          .fill()
          .map(() => React.createRef());
        videoRefs.current = Array(mockClips.length)
          .fill()
          .map(() => React.createRef());
      } catch (error) {
        console.error("Clips fetch error:", error);
        setClips([]);
      } finally {
        setLoading(false);
      }
    };

    getClips();
    return () => {
      Object.values(likeAnimationTimeoutRef.current).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, [activeCategory]);

  useEffect(() => {
    if (!clips.length) return;

    const loadVideo = (index) => {
      if (videoRefs.current[index] && videoRefs.current[index].current) {
        videoRefs.current[index].current.load();
      }
    };

    for (let i = 0; i < Math.min(2, clips.length); i++) {
      loadVideo(i);
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          loadVideo(index);

          if (index < clips.length - 1) {
            loadVideo(index + 1);
          }

          if (currentClipIndex !== index) {
            if (currentClipIndex < clips.length) {
              const prevClipId = clips[currentClipIndex]?.id;
              if (prevClipId) {
                stopVideo(prevClipId);
              }
            }

            setCurrentClipIndex(index);

            if (initialViewCompleted || index > 0) {
              const clipId = clips[index].id;
              playVideo(clipId);
              setInitialViewCompleted(true);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    clipRefs.current.forEach((ref) => {
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
  }, [clips, currentClipIndex, initialViewCompleted]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)}w`;

    return new Date(date).toLocaleDateString();
  };

  const handleLike = (clipId) => {
    setIsLiked((prev) => ({
      ...prev,
      [clipId]: !prev[clipId],
    }));
  };

  const handleDoubleTap = (clipId) => {
    const videoEl = videoRefs.current.find(
      (ref, index) => clips[index].id === clipId
    )?.current;

    if (videoEl) {
      const isPlaying = playingStates[clipId];

      // If the video is playing, pause it before liking
      if (isPlaying) {
        stopVideo(clipId);
      }

      setIsLiked((prev) => ({
        ...prev,
        [clipId]: true,
      }));

      setShowLikeAnimation((prev) => ({
        ...prev,
        [clipId]: true,
      }));

      if (likeAnimationTimeoutRef.current[clipId]) {
        clearTimeout(likeAnimationTimeoutRef.current[clipId]);
      }

      setShowLikeAnimation((prev) => ({
        ...prev,
        [clipId]: false,
      }));
      delete likeAnimationTimeoutRef.current[clipId];
    }
  };

  const playVideo = (clipId) => {
    const videoEl = videoRefs.current.find(
      (ref, index) => clips[index].id === clipId
    )?.current;

    if (videoEl) {
      Object.keys(playingStates).forEach((id) => {
        if (id !== clipId && playingStates[id]) {
          stopVideo(id);
        }
      });

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            videoEl.muted = false;
            setPlayingStates((prevState) => ({ ...prevState, [clipId]: true }));
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setPlayingStates((prevState) => ({
              ...prevState,
              [clipId]: false,
            }));
          });
      }
    }
  };

  const stopVideo = (clipId) => {
    const videoEl = videoRefs.current.find(
      (ref, index) => clips[index].id === clipId
    )?.current;

    if (videoEl) {
      videoEl.pause();
      setPlayingStates((prevState) => ({ ...prevState, [clipId]: false }));
    }
  };

  const togglePlayPause = (clipId) => {
    const isPlaying = playingStates[clipId];

    if (isPlaying) {
      stopVideo(clipId);
    } else {
      playVideo(clipId);
    }
  };

  return (
    <div className="flex justify-center mx-auto w-full min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full px-2 md:px-6 gap-6">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1 lg:w-2/3">
            <div className="flex flex-col w-full max-w-3xl mx-auto">
              {loading && (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              )}

              {!loading && clips.length > 0 && (
                <div className="snap-y snap-mandatory h-screen aspect-[9/16] overflow-y-scroll no-scrollbar">
                  {clips.map((clip, index) => (
                    <div
                      key={clip.id}
                      ref={clipRefs.current[index]}
                      data-index={index}
                      className="snap-start h-full w-full flex flex-col relative mb-1"
                    >
                      <div className="relative flex-1 bg-black overflow-hidden">
                        <div
                          className="h-full w-full"
                          onClick={() => togglePlayPause(clip.id)}
                        >
                          <video
                            ref={videoRefs.current[index]}
                            src={clip.media_key}
                            className="h-full w-full object-contain bg-black"
                            loop
                            playsInline
                            muted={true}
                            preload="metadata"
                            poster=""
                            disablePictureInPicture
                            style={{ objectFit: "cover" }}
                          />

                          {!playingStates[clip.id] && (
                            <button
                              className="absolute inset-0 flex items-center justify-center text-white text-4xl"
                              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePlayPause(clip.id);
                              }}
                              onDoubleClick={() => handleDoubleTap(clip.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-12 h-12"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.5 5.653c0-1.426 1.517-2.342 2.797-1.542l8.625 5.138a1.5 1.5 0 010 2.698l-8.625 5.138A2.25 2.25 0 014.5 18.347V5.653z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                        </div>

                        {showLikeAnimation[clip.id] && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-32 h-32 text-red-500 animate-heartBeat"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </div>
                        )}

                        <div className="absolute bottom-0 right-0 m-4 flex flex-col justify-end items-center space-y-4">
                          <button
                            className="flex flex-col items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(clip.id);
                            }}
                          >
                            {isLiked[clip.id] ? (
                              <svg
                                aria-label="Unlike"
                                fill="#ED4956"
                                height="24"
                                role="img"
                                viewBox="0 0 48 48"
                                width="24"
                                className="animate-pulse"
                              >
                                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                              </svg>
                            ) : (
                              <svg
                                aria-label="Like"
                                fill="#ffffff"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                              </svg>
                            )}
                            <span className="text-white text-xs mt-1">
                              {formatNumber(
                                isLiked[clip.id]
                                  ? clip.likes_count + 1
                                  : clip.likes_count
                              )}
                            </span>
                          </button>

                          <button className="flex flex-col items-center">
                            <svg
                              aria-label="Comment"
                              fill="#ffffff"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path
                                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>
                            </svg>
                            <span className="text-white text-xs mt-1">
                              {formatNumber(clip.comments_count)}
                            </span>
                          </button>

                          <button className="flex flex-col items-center">
                            <svg
                              aria-label="Share"
                              fill="#ffffff"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <line
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                x1="22"
                                x2="9.218"
                                y1="3"
                                y2="10.083"
                              ></line>
                              <polygon
                                fill="none"
                                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></polygon>
                            </svg>
                            <span className="text-white text-xs mt-1">
                              {formatNumber(clip.shares_count)}
                            </span>
                          </button>

                          <button className="flex flex-col items-center">
                            <svg
                              aria-label="More"
                              fill="#ffffff"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <circle cx="12" cy="12" r="1.5"></circle>
                              <circle cx="6" cy="12" r="1.5"></circle>
                              <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                          </button>

                          <div className="w-8 h-8 rounded-md bg-gray-800 overflow-hidden mt-2">
                            <img
                              src={
                                clip.track?.artists?.[0]?.profileImage ||
                                "https://i.pravatar.cc/150?img=3"
                              }
                              alt="Track"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-12 p-4 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-white/30">
                              <img
                                src={clip.creators[0]?.avatar}
                                alt={clip.creators[0]?.username}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <p className="text-white font-medium flex items-center">
                                  {clip.creators[0]?.username}
                                  {clip.creators[0]?.is_verified && (
                                    <svg
                                      className="w-4 h-4 ml-1 text-blue-500"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                  )}
                                </p>
                                <button className="ml-2 px-3 py-1 text-xs font-semibold text-white border border-white/50 rounded-md hover:bg-white/10 transition">
                                  Follow
                                </button>
                              </div>
                              <p className="text-white/80 text-xs">
                                {formatTime(clip.created_at)}
                              </p>
                            </div>
                          </div>
                          <p className="text-white mb-2">{clip.caption}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {clip.hashtags.split(",").map((tag, idx) => (
                              <span key={idx} className="text-blue-400 text-sm">
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center text-white text-sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 3v10m0 0l-3.5-3.5M12 13l3.5-3.5M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4"></path>
                              </svg>
                              <span>
                                {clip.track?.title} -{" "}
                                {clip.track?.artists?.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && clips.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-400">
                    No clips found in this category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clips;
