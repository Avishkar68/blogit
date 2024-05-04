import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/FirebaseConfig'
import { useNavigate } from 'react-router'
import '../css/Register.css'

const Register = () => {

  const history = useNavigate()
  

  const handleSubmit =(e)=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    createUserWithEmailAndPassword(auth, email, password).then((e)=>{
      console.log(e , "authdata")
      history("/mainpage")
    }).catch((Err)=>{
      alert(Err.code)
    })
  }

  return (
    <div className='register-container'>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <h1>Register</h1>
        <input name='email' placeholder='Email' />
        <input name='password' placeholder='Password' />
        <button>SignIn</button>
      </form>
    </div>
  )
}

export default Register
