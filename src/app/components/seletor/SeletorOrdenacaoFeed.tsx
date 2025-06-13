import React, { useState } from 'react';

interface Option {
  value: string;
  text: string;
}

interface SelectProps {
  defaultValue?: string;
  options?: Option[];
}

const SeletorOrdenacaoFeed: React.FC<SelectProps> = ({
  defaultValue = "Ordenar",
  options = [],
}) => {
  const [valorSelecionado, setValorSelecionado] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValorSelecionado(e.target.value);
    console.log('Selecionado:', e.target.value); // Aqui você pode lidar com a ordenação
  };

  return (
    <div className="w-48">
      <select
        value={valorSelecionado}
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

