import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import Input from '../../UI/Input/Input'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Modal from '../../UI/Modal/Modal';
import Form from '../../UI/Forms/Form';
import LoginIcon from '@mui/icons-material/Login';
import Button from '../../UI/Button/Button';
import Link from 'next/link';
import { gql } from "@apollo/client";
import client from '../../../apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setCode, setDisabled, setErrors, setIsAuth, 
  setModalOpen, setOtp, setPhoneNumber, 
  setSuccess, setValue } from '../../../src/redux/actions';
import { User } from '../../../types/types';
import { BAD_REQUEST, NOT_AUTHORIZED } from '../../../messages/errors';
import { messages } from '../../../messages/messages';
import { SUCCESS_AUTH } from '../../../messages/success';
import { useRouter } from 'next/router';

const Header = () => {
    //
    const router = useRouter()
    const handleProfileRedirect =() =>{
      router.push('/user')
    }
    //redux dispatcher 
    const dispatch = useDispatch()
    // Отключение кнопки
    const disabled = useSelector((state: {isDisabled: boolean}) => state.isDisabled)
    //Сообщения об успехе / ошибке
    const errors = useSelector((state: {messages:{errors: string}}) => state.messages.errors)
    const success = useSelector((state: {messages:{success: string}}) => state.messages.success)
    // Сохранение данных из инпутов
    const code = useSelector((state: {data:{code: string}}) => state.data.code)
    const otp = useSelector((state: {data:{otp: string}}) => state.data.otp)
    const phone = useSelector((state: {data:{phone: string}}) => state.data.phone)
    // Флаг авторизации

    const isAuth = useSelector((state: {auth:{isAuth: boolean}}) => state.auth.isAuth)
    // Сохранение токена из запроса
    const [token, setToken] = useState<string>('')
    // const token = useSelector((state: {token: { token: string }})=> state.token.token)
    //Регулярка +валидация
    const isValidPhone = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(phone);
    const handleChangeNumberPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPhoneNumber(e.target.value));
    };
    // GraphQL Queries
    const ME_QUERY = gql`
      query Me {
        me {
          id
          firstName
          lastName
          middleName
          phone
        }
      }`;
      useEffect(() => {
      console.log(token)
      }, [token])
      
    // Запросы на сервер(авторизации)
    const handleSubmitCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidPhone){
          dispatch(setDisabled(true))
          dispatch(setErrors('Некорректный номер телефона'))
          return
        } else {
          dispatch(setErrors(''))
          dispatch(setDisabled(false))
        }
        try {
          const response = await fetch('https://shop-smart-api-1c3c0f010f3b.herokuapp.com/api/auth', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phone }),
          });
          const data = await response.json();
          setToken(data.token)
        } catch (error) {
          console.error(messages.WRONG_REQUEST, error);
        }

      };
    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setDisabled(true))
        try {
          const response = await fetch('https://shop-smart-api-1c3c0f010f3b.herokuapp.com/api/otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code: code }),
        });
        const res = await response.json();
        if (response.status === NOT_AUTHORIZED){
          dispatch(setErrors(messages.AUTHENTICATION_ERROR))
          
        }
        if (response.status === BAD_REQUEST){
          dispatch(setErrors(messages.CODE_ERROR))
 
        }
        if (response.status === SUCCESS_AUTH){
          setToken(res.token)
          dispatch(setSuccess(messages.SUCCESS_AUTHENTICATION))
          try{
            const { data } = await client.query<{ me: User }>({
              query: ME_QUERY,
              context: {
                headers: {
                  Authorization: `Bearer ${res.token}`,
                },
              },
            });
            localStorage.setItem('userPhone', data.me.phone)
            const {firstName, lastName, middleName} = data.me;
            if (firstName && lastName && middleName) {
              // Все данные пользователя заполнены
              console.log('Авторизирован', data.me.id);
            } else {
              // Перенаправить на страницу Личного кабинета пользователя
              // чтобы заполнить недостающие данные
              console.log('Не все данные заполнены, переадресация...')
             
              setTimeout(() => {
              handleProfileRedirect()
               }, 4000)
             }
          } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
          }
          setTimeout(() => {
            openModal()
            dispatch(setIsAuth(true))
        }, 3000);

          localStorage.setItem('token', res.token);
        }
        
        } catch (error) {
        console.error(messages.WRONG_REQUEST, error);
        }
    };
    const handleResendCode = async (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(setErrors(''))
      dispatch(setCode(''))
      dispatch(setDisabled(false))
      try {
        const response = await fetch('https://shop-smart-api-1c3c0f010f3b.herokuapp.com/api/otp/send', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ phone: phone }),
        });
        const data = await response.json();
        setToken(data.token)
        if (response.status === 201){
          dispatch(setErrors(response.statusText))
        } 
      } catch (error) {
        console.error(messages.WRONG_REQUEST, error);
      }

    };
    
    //Input changes
    const value = useSelector((state:{ inputValue: { value: string } })=> state.inputValue.value)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setValue(e.target.value))
    }
    const handleCode = (e:any) => {
      dispatch(setCode(e.target.value))
    }

    //Modal window

    const modalOpen = useSelector((state:{modalOpen: {modalOpen: boolean}}) => state.modalOpen.modalOpen)
    const openModal = () =>{
      dispatch(setModalOpen(!modalOpen))
    }
  return (
    <header className={styles.header}>
        <div className={styles.header__item}> {/* Лого + каталог*/}
         <Link href={'/'}>
            <Image 
            src="/Icon.svg" 
            alt="Vercel Logo" 
            width={250} 
            height={68}  
            style={{cursor: 'pointer'}}/>
         </Link>
         </div>
        <div className={styles.header__item}>  {/* Поиск */}
          <div className={styles.catalog}>
            <div className={styles.catalogbtn}><DensityMediumIcon /><p>Каталог</p></div>      
                <ul className={styles.cataloglist}>
                    <li className={styles.catalog_item}>Категория 1</li>
                    <li className={styles.catalog_item}>Категория 2</li>
                    <li className={styles.catalog_item}>Категория 3</li>
                </ul>
            </div>
            <Input
            type={'text'}
            value={value} 
            onChange={handleChange} 
            placeholder='Поиск...' 
            width={450} 
            size={24}
            />
        </div>
          
        <div className={styles.header__item}>  {/* Иконки + модалки */}
          
            {isAuth? 
              (<div className={styles.item}>
                <AccountBoxIcon style={{fontSize: '50px', color: "#006BA8"}}/>
                <p>{localStorage.getItem('userPhone')}</p>
                </div>)
              : 
              (<div onClick={openModal} className={styles.item}>
                <AccountBoxIcon style={{fontSize: '50px', color: "#006BA8"}}/>
                <p>Войти</p>
              </div>)
            }
            
          
        </div>      
        {/* Модалка авторизации */}
        <Modal modalOpen={modalOpen} setModalOpen={openModal}>
            <Form modalOpen={modalOpen} setModalOpen={openModal}>         
                <LoginIcon />
                <h3>Вход</h3>
                {
                  (errors==='Некорректный номер телефона') ? 
                  <p style={{color:'red'}}>{errors}</p> 
                  :
                  null
                }
                <Input 
                type={'tel'}
                value={phone} 
                onChange={handleChangeNumberPhone} 
                placeholder='Введите номер телефона' 
                width={550}
                size={16}
                /> 

              {token ? 
                <>
                
                <Input 
                type={'text'}
                value={code} 
                onChange={handleCode} 
                placeholder='Введите код' 
                width={550}
                size={16} 
                />
                <Button onClick={handleVerifyCode} text='Отправить код' disabled={disabled}/>
                </>
                :
                <Button onClick={handleSubmitCode} text='Получить код' />
              }
              { (errors === 'Неправильный код')?  
              <>
                <p style={{color: 'red'}}>{errors}</p> 
                <p onClick={handleResendCode} className={styles.resend}>Отправить заново</p>
              </>
              : null}
              {success ? 
              <p style={{color: 'green'}}>{success}</p> 
              : null}
            </Form>
           
        </Modal>       
      </header> 
  )
}

export default Header