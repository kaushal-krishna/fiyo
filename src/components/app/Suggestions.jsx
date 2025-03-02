import React from "react";

const Suggestions = () => {
  const suggestions = [
    {
      id: 1,
      username: "user1",
      name: "User One",
      avatar: "https://i.pravatar.cc/200",
    },
    {
      id: 2,
      username: "user2",
      name: "User Two",
      avatar: "https://i.pravatar.cc/150",
    },
    {
      id: 3,
      username: "user3",
      name: "User Three",
      avatar: "https://i.pravatar.cc/100",
    },
    {
      id: 4,
      username: "user4",
      name: "User Four",
      avatar: "https://i.pravatar.cc/200",
    },
    {
      id: 5,
      username: "user5",
      name: "User Five",
      avatar: "https://i.pravatar.cc/150",
    },
    {
      id: 6,
      username: "user6",
      name: "User Six",
      avatar: "https://i.pravatar.cc/100",
    },
  ];

  return (
    <div className="bg-body-bg dark:bg-body-bg-dark rounded-lg p-4 sticky top-2">
      <h2 className="text-xl text-gray-900 dark:text-white font-bold mb-4">
        Suggestions For You
      </h2>
      <div className="flex flex-col gap-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                className="w-10 h-10 bg-secondary-bg dark:bg-secondary-bg-dark rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">@{user.username}</p>
              </div>
            </div>
            <button className="text-blue-500 font-semibold hover:text-blue-600 cursor-pointer">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
