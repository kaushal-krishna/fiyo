import React, { useState, useEffect } from "react";
import { Users, X, Hash, PlusCircle, Info } from "lucide-react";

const AddDetails = ({ caption, setCaption, description, setDescription }) => {
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [collaborator, setCollaborator] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [captionCharCount, setCaptionCharCount] = useState(0);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const maxCaptionChars = 280;
  const maxDescriptionChars = 500;

  useEffect(() => {
    setCaptionCharCount(caption?.length || 0);
  }, [caption]);

  useEffect(() => {
    setDescriptionCharCount(description?.length || 0);
  }, [description]);

  const handleCaptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCaptionChars) {
      setCaption(text);
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxDescriptionChars) {
      setDescription(text);
    }
  };

  const addHashtag = () => {
    if (hashtag.trim() && !hashtags.includes(hashtag.trim())) {
      setHashtags([...hashtags, hashtag.trim()]);
      setHashtag("");
    }
  };

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const addCollaborator = () => {
    if (collaborator.trim() && !collaborators.includes(collaborator.trim())) {
      setCollaborators([...collaborators, collaborator.trim()]);
      setCollaborator("");
    }
  };

  const removeCollaborator = (collab) => {
    setCollaborators(collaborators.filter((c) => c !== collab));
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  const isFormValid = caption.trim().length > 0;

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-primary-text dark:text-primary-text-dark">
        Add Details
      </h2>

      <div className="space-y-6">
        {/* Caption Field */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-primary-text dark:text-primary-text-dark">
              Caption
            </label>
            <span
              className={`text-xs ${
                captionCharCount > maxCaptionChars * 0.8
                  ? "text-amber-500"
                  : "text-gray-500"
              }`}
            >
              {captionCharCount}/{maxCaptionChars}
            </span>
          </div>
          <textarea
            className="w-full p-3 border rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark border-tertiary-bg dark:border-tertiary-bg-dark text-primary-text dark:text-primary-text-dark focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows="3"
            placeholder="Write a caption..."
            value={caption || ""}
            onChange={handleCaptionChange}
          />
        </div>

        {/* Description Field */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-1">
              <label className="text-sm font-medium text-primary-text dark:text-primary-text-dark">
                Description
              </label>
              <Info
                size={14}
                className="text-gray-400 cursor-help"
                title="Add more details about your post"
              />
            </div>
            <span
              className={`text-xs ${
                descriptionCharCount > maxDescriptionChars * 0.8
                  ? "text-amber-500"
                  : "text-gray-500"
              }`}
            >
              {descriptionCharCount}/{maxDescriptionChars}
            </span>
          </div>
          <textarea
            className="w-full p-3 border rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark border-tertiary-bg dark:border-tertiary-bg-dark text-primary-text dark:text-primary-text-dark focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows="4"
            placeholder="Add more details about your post (optional)"
            value={description || ""}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-primary-text dark:text-primary-text-dark mb-2">
            Add hashtags
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Hash
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark border-tertiary-bg dark:border-tertiary-bg-dark text-primary-text dark:text-primary-text-dark focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Type a hashtag and press Enter"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addHashtag)}
              />
            </div>
            <button
              onClick={addHashtag}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              disabled={!hashtag.trim()}
            >
              <PlusCircle size={20} />
            </button>
          </div>

          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {hashtags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium transition-all hover:bg-blue-100 dark:hover:bg-blue-800/50"
                >
                  <span>#{tag}</span>
                  <button
                    onClick={() => removeHashtag(tag)}
                    className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"
                    aria-label={`Remove hashtag ${tag}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-primary-text dark:text-primary-text-dark mb-2">
            Tag collaborators
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Users
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border rounded-lg bg-secondary-bg dark:bg-secondary-bg-dark border-tertiary-bg dark:border-tertiary-bg-dark text-primary-text dark:text-primary-text-dark focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Add a collaborator and press Enter"
                value={collaborator}
                onChange={(e) => setCollaborator(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addCollaborator)}
              />
            </div>
            <button
              onClick={addCollaborator}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              disabled={!collaborator.trim()}
            >
              <PlusCircle size={20} />
            </button>
          </div>

          {collaborators.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {collaborators.map((collab) => (
                <div
                  key={collab}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium transition-all hover:bg-purple-100 dark:hover:bg-purple-800/50"
                >
                  <span>@{collab}</span>
                  <button
                    onClick={() => removeCollaborator(collab)}
                    className="p-0.5 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full transition-colors"
                    aria-label={`Remove collaborator ${collab}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            className={`w-full py-3.5 rounded-lg shadow-sm hover:shadow-md active:scale-99 transform duration-100 ${
              isFormValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;
