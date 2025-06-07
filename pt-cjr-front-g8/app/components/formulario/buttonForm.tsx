import React from 'react'

interface ButtonFormProps {
  label: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  style?: React.CSSProperties
  disabled?: boolean
}

const ButtonForm: React.FC<ButtonFormProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  style,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth : 'fit-content',
        height : '35px',
        border: 'solid 2px',
        fontSize: '1rem',
        textAlign: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {label}
    </button>
  )
}

export default ButtonForm
