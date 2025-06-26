import { ControlProps, OptionProps, GroupBase } from 'react-select';

export const layoutBuscadinamica = {
  control: (state: ControlProps<any, false, GroupBase<any>>) => 
    `!bg-white !rounded-lg !border !border-gray-300 !p-1 ${
      state.isFocused ? '!shadow-none !ring-2 !ring-emerald-500' : ''
    }`,
  input: () => '!text-gray-800 !placeholder-gray-400',
  // CORREÇÃO AQUI: Use OptionProps para o 'option'
  option: (state: OptionProps<any, false, GroupBase<any>>) => 
    `!p-3 ${state.isFocused ? '!bg-gray-200' : ''} ${state.isSelected ? '!bg-emerald-100 !text-emerald-800' : ''} !text-blue-500`,
  menu: () => '!rounded-lg !shadow-lg !z-20',
  placeholder: () => '!text-gray-400',
};