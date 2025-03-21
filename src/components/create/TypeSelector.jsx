import React from 'react';
import { ChevronDown } from 'lucide-react';

const TypeSelector = ({ selectedType, setSelectedType }) => {
  const types = ['Post', 'Clip'];
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  return (
    <div className="relative w-40">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-primary-bg dark:bg-primary-bg-dark rounded-lg hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark transition-colors text-primary-text dark:text-primary-text-dark shadow-sm"
      >
        <span className="font-medium">{selectedType}</span>
        <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-body-bg dark:bg-body-bg-dark rounded-lg shadow-lg border border-tertiary-bg dark:border-tertiary-bg-dark">
          {types.map((type) => (
            <button
              key={type}
              className="w-full px-4 py-2 text-left hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark transition-colors text-primary-text dark:text-primary-text-dark"
              onClick={() => handleSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeSelector;
