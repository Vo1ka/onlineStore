import React, { FC } from 'react'
import styles from './../../styles/index.module.css'

interface indexContainerProps{
    children: React.ReactNode;
}

const indexContainer:FC<indexContainerProps> = ({children}) => {
  return (
    <div className={styles.container}>
            {children}
    </div>
  )
}

export default indexContainer