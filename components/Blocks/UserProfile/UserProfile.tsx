import React, { FC } from 'react'
import UserProfileContainer from '../../Containers/UserProfileContainer'
import ProfileHeader from './Header/ProfileHeader'
import styles from './UserProfile.module.css'
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import Button from '../../UI/Button/Button';

interface UserProfileProps{
    children: React.ReactNode;
}

const UserProfile:FC<UserProfileProps> = ({children}) => {
  return (
    <>
    <ProfileHeader>
        
    </ProfileHeader>
    <main className={styles.user}>
        <div className={styles.content}>
          <div className={styles.content__menu}>
            <div className={styles.menu}>
               <PersonIcon style={{
                padding: '5px', 
               fontSize: '150px', 
               color: "grey", 
               background:'white',
               borderRadius: '50%', 
                }}/>
               <p className={styles.menu__text}>ФИО</p>
               <div className={styles.menu__form}>
                <Link href={'#'}>Персональные данные</Link>
                <Link href={'#'}>Мои подписки</Link>
                <Link href={'#'}>История транзакций</Link>
                <Link href={'#'}>Мои организации</Link>
               </div>
               <Button text='Выход'/>
            </div>
           
          </div>
          <div className={styles.content__form}>
            <h1>Персональные данные</h1>
          </div>
        </div>
    </main>
    </>
  )
}

export default UserProfile