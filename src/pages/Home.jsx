// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/home/Post.jsx";
import FeedCard from "../components/home/FeedCard.jsx";
import Suggestions from "../components/app/Suggestions.jsx";
import CustomTopNav from "../layout/items/CustomTopNav.jsx";
import { ChatIcon, CreateIcon, NotificationsIcon } from "../icons.jsx";

const Home = () => {
  const navigate = useNavigate();
  const feedItems = [
    { id: 1, heading: "New Features", text: "Check out our latest updates!" },
    { id: 2, heading: "Community Update", text: "Join our growing community" },
    { id: 3, heading: "Tips & Tricks", text: "Learn new ways to use our app" },
  ];

  const posts = [
    {
      id: "1",
      profilePic: "https://i.pravatar.cc/200?img=1",
      username: "john.doe",
      songTitle: "Echoes • Fleetwood Band",
      postImage:
        "https://demo.tiny.pictures/main/example5.jpg?width=500&height=250",
      likesCount: 215,
      commentsCount: 98,
      sharesCount: 45,
      caption: "A beautiful day to vibe with this amazing track!",
      uploadDate: "12 January 2025",
    },
    {
      id: "2",
      profilePic: "https://i.pravatar.cc/200?img=2",
      username: "jane.smith",
      songTitle: "Golden Hour • JVKE",
      postImage:
        "https://demo.tiny.pictures/main/example1.jpg?width=500&height=250",
      likesCount: 332,
      commentsCount: 120,
      sharesCount: 67,
      caption: "Can't stop listening to this masterpiece 🌅",
      uploadDate: "11 January 2025",
    },
    {
      id: "3",
      profilePic: "https://i.pravatar.cc/200?img=3",
      username: "mike.breeze",
      songTitle: "Ocean Eyes • Billie Eilish",
      postImage:
        "https://demo.tiny.pictures/main/example3.jpg?width=500&height=250",
      likesCount: 450,
      commentsCount: 210,
      sharesCount: 80,
      caption: "Lost in the magic of this song 🎧.",
      uploadDate: "30 December 2024",
    },
    {
      id: "4",
      profilePic: "https://i.pravatar.cc/200?img=4",
      username: "sarah.connor",
      songTitle: "Blinding Lights • The Weeknd",
      postImage:
        "https://demo.tiny.pictures/main/example4.jpg?width=500&height=250",
      likesCount: 789,
      commentsCount: 300,
      sharesCount: 120,
      caption: "This song always hits differently ✨.",
      uploadDate: "15 December 2024",
    },
  ];

  return (
    <div className="flex justify-center w-full mx-6">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <CustomTopNav
            className="block lg:hidden"
            logoImage="https://cdnfiyo.github.io/img/logos/flexiyo.png"
            rightIcons={[
              {
                resource: <CreateIcon size={32} />,
                onPress: () => navigate("/create"),
              },
              {
                resource: <NotificationsIcon size={32} />,
                onPress: () => navigate("/notifications"),
              },
              {
                resource: <ChatIcon size={32} />,
                onPress: () => navigate("/direct/inbox"),
              },
            ]}
          />
          {/* Feed Section */}
          {/* <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {feedItems.map((item) => (
                <FeedCard
                  key={item.id}
                  heading={item.heading}
                  text={item.text}
                />
              ))}
            </div>
          </div> */}

          {/* Posts Section */}
          <div className="w-full flex flex-col items-center">
            {posts.map((post, index) => (
              <Post
                key={index}
                profilePic={post.profilePic}
                username={post.username}
                songTitle={post.songTitle}
                postImage={post.postImage}
                likesCount={post.likesCount}
                commentsCount={post.commentsCount}
                sharesCount={post.sharesCount}
                caption={post.caption}
                uploadDate={post.uploadDate}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Suggestions (only for large screens) */}
        <div className="hidden lg:block w-1/2">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Home;
