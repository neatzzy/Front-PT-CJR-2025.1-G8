import { Columns } from 'lucide-react'
import React from 'react'

interface InputFormProps {
  label: string
  placeholder?: string
  type?: string
}

const InputForm: React.FC<InputFormProps> = ({ label= '', placeholder = '', type = 'text' }) => {
  return (
    <div style={{
      display: 'column',
      gap: '5px',
      width: '50%'
    }}>
      <p style={{
        color: "#000000",
        fontSize: "1.25rem"
      }}>{label}</p>

      <input
        type={type}
        placeholder={placeholder}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '35px',
          padding: '5px',
          borderRadius: '5px',
          color: "black"
        }}
      />
    </div>
  )
}

export default InputForm
