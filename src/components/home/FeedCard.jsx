const FeedCard = ({ heading, text }) => {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[350px] bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">{heading}</h3>
      <p className="text-gray-600 mb-4">{text}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        Check Now
      </button>
    </div>
  );
};

export default FeedCard;
