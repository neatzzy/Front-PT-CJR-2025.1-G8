import React from 'react';

interface ToggleFeedProps {
  value: 'asc' | 'desc';
  onToggle: (value: 'asc' | 'desc') => void;
}

const ToggleFeed: React.FC<ToggleFeedProps> = ({
     value, 
     onToggle 
}) => {
  const isChecked = value === 'desc';

  const handleToggle = () => {
      onToggle(isChecked ? 'asc' : 'desc');
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="sr-only" 
        />
        <div className="w-28 h-10 rounded-full flex items-center px-1 py-0.5 transition-colors duration-500 bg-white">
            <div
            className={`w-9 h-full bg-blue-700 rounded-full shadow-md transform transition-transform duration-500 ${isChecked ? 'translate-x-17' : 'translate-x-0'}`}
            ></div>
        </div>

        <span
            className={`
            text-gray-700 absolute top-1/2 -translate-y-1/2 font-semibold pointer-events-none select-none text-sm transition-all duration-300
            ${isChecked ? 'left-2' : 'right-2'}
            `}
        >
            {value}
        </span>
    </label>

  );
};

export default ToggleFeed;
