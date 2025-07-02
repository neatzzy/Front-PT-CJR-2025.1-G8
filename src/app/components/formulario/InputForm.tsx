import React, { forwardRef } from 'react'

type InputFormProps = {
  label: string;
  placeholder: string;
  type?: string;
  error?: boolean;
  helperText?: string;
};

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label = '', placeholder = '', type = 'text', error = false, helperText = ''}, ref) => {
    return (
      <div className="flex flex-col gap-[5px] w-1/2">
        <p className="text-black text-[1.55rem]">
          {label}
        </p>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`bg-white w-full h-[35px] p-[5px] rounded-[5px] text-black border ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && helperText && (
          <span className="text-red-500 text-sm mt-1">{helperText}</span>
        )}
      </div>
    )
  }
)

InputForm.displayName = 'InputForm'

export default InputForm