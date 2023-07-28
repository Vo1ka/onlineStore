// Действия для редьюсера отключения кнопки
export const setDisabled = (isDisabled: boolean) => ({
    type: 'TOGGLE_BUTTON',
    payload: isDisabled,
  });
  
  // Действия для редьюсера сообщений об успехе и ошибке
  export const setErrors = (errors: string) => ({
    type: 'SET_ERRORS',
    payload: errors,
  });
  
  export const setSuccess = (success: string) => ({
    type: 'SET_SUCCESS',
    payload: success,
  });
  
  // Действия для редьюсера сохранения данных из инпутов
  export const setCode = (code: string) => ({
    type: 'SET_CODE',
    payload: code,
  });
  
  export const setOtp = (otp: string) => ({
    type: 'SET_OTP',
    payload: otp,
  });
  
  export const setPhoneNumber = (phone: string) => ({
    type: 'SET_PHONE_NUMBER',
    payload: phone,
  });
  
  // Действия для редьюсера флага авторизации
  export const setIsAuth = (isAuth: boolean) => ({
    type: 'SET_IS_AUTH',
    payload: isAuth,
  });
  // Значение инпута
  export const setValue = (value: string) => ({
    type: 'SET_VALUE',
    payload: value,
  })
  //Модалки 
  export const setModalOpen = (modalOpen: boolean) =>({
    type: 'SET_MODAL_OPEN',
    payload: modalOpen,
  })
  export const setToken = (token: string) => ({
    type: 'SET_TOKEN',
    payload: token,
  })