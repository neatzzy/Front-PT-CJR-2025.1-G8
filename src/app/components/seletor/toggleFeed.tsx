import React from 'react';

interface ToggleFeedProps {
  value: 'asc' | 'desc';
  onToggle: (value: 'asc' | 'desc') => void;
}

const ToggleFeed: React.FC<ToggleFeedProps> = ({ value, onToggle }) => {
  const isChecked = value === 'asc';

  const handleToggle = () => {
    // Aqui enviamos o contrário do valor atual
    onToggle(value === 'asc' ? 'desc' : 'asc');
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="sr-only"
      />
      <div className="w-28 h-10 rounded-full flex items-center px-1 py-0.5 transition-colors duration-500 bg-white border-2 border-black">
        <div
          className={`w-9 h-full bg-[#00ABED] rounded-full shadow-md transform transition-transform duration-500 ${
            isChecked ? 'translate-x-17' : 'translate-x-0'
          }`}
        ></div>
      </div>

      <span
        className={`
          text-gray-400 absolute top-1/2 -translate-y-1/2 pointer-events-none select-none text-sm transition-all duration-300 mx-2
          ${isChecked ? 'left-2' : 'right-2'}
        `}
      >
        {/* Mostra o oposto do valor real */}
        {value === 'asc' ? 'desc' : 'asc'}
      </span>
    </label>
  );
};

export default ToggleFeed;
