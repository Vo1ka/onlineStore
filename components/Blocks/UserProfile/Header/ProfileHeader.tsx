import React, { FC } from 'react'
import styles from './ProfileHeader.module.css'
import Link from 'next/link'
import Image from 'next/image'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface ProfileHeaderProps{
    children: React.ReactNode;
}

const ProfileHeader:FC<ProfileHeaderProps> = () => {
  return (
    <header className={styles.header}>
        <div className={styles.header__item}>
        <Link href={'/'}>
            <Image 
            src="/Icon.svg" 
            alt="Vercel Logo" 
            width={250} 
            height={68}  
            style={{cursor: 'pointer'}}/>
         </Link>
        </div>

        <div className={styles.header__item}>
        <div className={styles.item}>
                <AccountBoxIcon style={{fontSize: '50px', color: "#006BA8"}}/>
                <p>{localStorage.getItem('userPhone')}</p>
                </div>
        </div>
    </header>
  )
}

export default ProfileHeader