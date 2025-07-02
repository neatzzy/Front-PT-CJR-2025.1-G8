import React, { forwardRef } from 'react'

interface InputFormProps {
  label: string
  placeholder?: string
  type?: string
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label = '', placeholder = '', type = 'text' }, ref) => {
    return (
      <div className="flex flex-col gap-[5px] w-1/2">
        <p className="text-black text-[1.55rem]">
          {label}
        </p>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="bg-white w-full h-[35px] p-[5px] rounded-[5px] text-black"
        />
      </div>
    )
  }
)

InputForm.displayName = 'InputForm'

export default InputForm