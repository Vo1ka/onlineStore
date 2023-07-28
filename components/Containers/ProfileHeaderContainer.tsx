import React, { FC } from 'react'
import UserProfile from '../Blocks/UserProfile/UserProfile';

interface ProfileHeaderContainerProps {
    children: React.ReactNode;
}

const ProfileHeaderContainer:FC<ProfileHeaderContainerProps> = ({children}) => {
  return (
    <UserProfile>
        
    </UserProfile>
  )
}

export default ProfileHeaderContainer