import React, { FC } from 'react'
import styles from './form.module.css'
import CloseIcon from '@mui/icons-material/Close';


interface FormProps{
  modalOpen: boolean;
  setModalOpen: (e:any) => void;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => Promise<void>;
}

const Form:FC<FormProps> = ({modalOpen, setModalOpen, children, onSubmit}) => {
  return (
    <form onSubmit={onSubmit} action="" className={styles.form}>
        <CloseIcon onClick={()=>setModalOpen(!modalOpen)} className={styles.closebtn}/>
        {children}
    </form>
  )
}

export default Form