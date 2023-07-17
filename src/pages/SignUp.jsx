import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import {toast} from 'react-toastify';
import OAuth from '../components/OAuth'

function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const {name, email, password} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, //will change value based on which input field is being typed in (email of password)

    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      //formdata copy contains email and timestamp. password was removed from it

      await setDoc(doc(db, 'users', user.uid), formDataCopy) //updates the database

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
          <input type="text" className="nameInput" placeholder='Name' id='name' value={name} onChange={onChange} />
            <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
              <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} /> {/* if true its false. if false its true*/}
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'> Forgot Password </Link>
            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          <OAuth />
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp