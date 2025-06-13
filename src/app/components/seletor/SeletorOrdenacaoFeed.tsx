import React from 'react';

interface Option {
  value: string;
  text: string;
}

interface SelectProps {
  defaultValue?: string;
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

const SeletorOrdenacaoFeed: React.FC<SelectProps> = ({
  defaultValue = "Ordenar",
  options = [],
  value = "",
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-48">
      <select
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg bg-white text-gray-800"
      >
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeletorOrdenacaoFeed;