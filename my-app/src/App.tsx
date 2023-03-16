import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
//import {useForm} from "react-hook-form"; [useForm()]

export default function App() {
    const { register, handleSubmit } = useForm();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('Пароль обязателен для заполнения')
    const [emailError, setEmailError] = useState('Email обязателен для заполнения')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(emailError || passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [emailError, passwordError])
    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e: any) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Неправильная форма Email')
            if (!e.target.value) {
            setEmailError('Email обязателен для заполнения')
            }
        } else {
            setEmailError('')
        }
    }
    const passwordHandler = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6){
            setPasswordError('Пароль должен содержать более 6 символов')
            if (!e.target.value){
                setPasswordError('Пароль обязателен для заполнения')
            }
        } else {
            setPasswordError('')
        }
    }
    const onSubmit = () => {
        console.log(email);
        console.log(password);
    }

  return (
      <div className="App">
          <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="Head">Регистрация</h1>
              {(emailDirty && emailError) && <div className="Error">{emailError}</div>}
              <label className="label">Введите Email</label>
              <input className="input" onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='email' placeholder='Enter your email...'/>
              {(passwordDirty && passwordError) && <div className="Error">{passwordError}</div>}
              <label className="label">Введите пароль</label>
              <input className="input" onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Enter your password...'/>
              <span className="label">
                  <button className="button" disabled={!formValid} type='submit'>Регистрация</button>
              </span>
          </form>
      </div>
  );
}

