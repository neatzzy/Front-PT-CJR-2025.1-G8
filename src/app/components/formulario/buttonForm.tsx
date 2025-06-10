import React from 'react'

interface ButtonFormProps {
  label: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
}

const ButtonForm: React.FC<ButtonFormProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        min-w-fit
        h-[35px]
        border-2
        text-base
        text-center
        justify-center
        ${className}
      `}
    >
      {label}
    </button>
  )
}

export default ButtonForm
