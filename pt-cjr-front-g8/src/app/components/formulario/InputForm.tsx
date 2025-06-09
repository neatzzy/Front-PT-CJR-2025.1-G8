import React, { forwardRef } from 'react'

interface InputFormProps {
  label: string
  placeholder?: string
  type?: string
}

// Note que `forwardRef` envolve a função do componente
const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label = '', placeholder = '', type = 'text' }, ref) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '75%',
          margin: '20px'
        }}
      >
        <p
          style={{
            color: '#000000',
            fontSize: '1.55rem',
          }}
        >
          {label}
        </p>

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: '35px',
            padding: '5px',
            borderRadius: '5px',
            color: 'black',
          }}
        />
      </div>
    )
  }
)

InputForm.displayName = 'InputForm'

export default InputForm
