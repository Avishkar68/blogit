import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/FirebaseConfig'
import { useNavigate } from 'react-router'
import '../css/Login.css'
import { useSelector , useDispatch} from 'react-redux'
import { updateLogin } from '../app/loginSlice'


const Login = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  

  const handleSubmit =(e)=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    signInWithEmailAndPassword(auth, email, password).then((e)=>{
      console.log(e , "authdata")
      dispatch(updateLogin())
    
      history("/mainpage")
    }).catch((Err)=>{
      alert(Err.code)
    })
  }

  return (
    <div className='login-container'>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <h1>Login</h1>
        <input name='email' placeholder='Email' />
        <input name='password' placeholder='Password' />
        <button>SignIn</button>
      </form>
    </div>
  )
}

export default Login
