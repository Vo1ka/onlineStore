import React, { FC } from 'react'
import UserProfile from '../Blocks/UserProfile/UserProfile'
import IndexContainer from './../Containers/indexContainer'
import ProfileHeaderContainer from './ProfileHeaderContainer';

interface UserProfileContainerProps{
    children: React.ReactNode;
}

const UserProfileContainer:FC<UserProfileContainerProps> = ({children}) => {
  return (
    <IndexContainer>
    <ProfileHeaderContainer> 
        <UserProfile> 
            
        </UserProfile>
    </ProfileHeaderContainer>
    </IndexContainer>
  )
}

export default UserProfileContainer