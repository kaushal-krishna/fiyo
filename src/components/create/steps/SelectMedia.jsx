import React from 'react';
import { Upload } from 'lucide-react';

const SelectMedia = ({ onMediaSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onMediaSelect(url, file.type.startsWith('video/') ? 'video' : 'image');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary-text dark:text-primary-text-dark">Select Media</h2>
      <div className="border-2 border-dashed border-tertiary-bg dark:border-tertiary-bg-dark rounded-xl p-8 bg-secondary-bg dark:bg-secondary-bg-dark hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark transition-colors group">
        <label className="flex flex-col items-center gap-4 cursor-pointer">
          <Upload size={40} className="text-primary-text dark:text-primary-text-dark opacity-60 group-hover:opacity-100 transition-opacity" />
          <span className="text-primary-text dark:text-primary-text-dark opacity-90">Click to upload or drag and drop</span>
          <span className="text-sm text-primary-text dark:text-primary-text-dark opacity-60">Supports images and videos</span>
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default SelectMedia;
