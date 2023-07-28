import React, { FC } from 'react'
import Header from '../Blocks/Header/Header';


interface HeaderContainerProps{
  children: React.ReactNode;
}

const HeaderContainer:FC<HeaderContainerProps> = ({children}) => {
  return (
    <Header />
  )
}

export default HeaderContainer