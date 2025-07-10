import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  defaultValue?: string;
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

const customStyles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    borderRadius: '9999px',
    borderColor: '#000',
    minHeight: '2.5rem',
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: 'none',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#00ABED' : '#fff',
    color: state.isFocused ? '#fff' : '#000',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
  }),
};

const SeletorOrdenacaoFeed: React.FC<SelectProps> = ({
  defaultValue = "Ordenar",
  options = [],
  value = "",
  onChange,
}) => {
  // react-select espera options no formato { value, label }
  const selectOptions = options.map(opt => ({
    value: opt.value,
    label: opt.label, 
  }));

  const selectedOption = selectOptions.find(opt => opt.value === value) || null;

  const handleChange = (option: SingleValue<Option>) => {
    if (onChange && option) {
      onChange(option.value);
    }
  };

  return (
    <div className="w-48 cursor-pointer">
      <Select
        instanceId="ordenacao-feed"
        options={selectOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder={defaultValue}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
};

export default SeletorOrdenacaoFeed;