import React, { FC } from 'react'
import styles from './button.module.css'

interface ButtonProps{
    text: string;
    onClick?: (e: React.FormEvent) => Promise<void>;
    disabled?: boolean | undefined;
}

const Button:FC<ButtonProps> = ({text, onClick, disabled}) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${disabled? disabled : null} `} disabled={disabled}>
        {text}
    </button>
  )
}

export default Button