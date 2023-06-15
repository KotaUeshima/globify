'use client'
import BackButton from '@/src/components/layout/BackButton'
import ButtonLoader from '@/src/components/loaders/ButtonLoader'
import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch } from '@/src/redux/store'
import { BACKEND_URL, routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Signup() {
  const defaultSignUpUser: SignUpUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const defaultError: SignUpError = {
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  }

  const [signUpUser, setSignUpUser] =
    useState<SignUpUser>(defaultSignUpUser)
  const [error, setError] = useState<SignUpError>(defaultError)
  const [signupButtonActive, setSignupButtonActive] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const updateUserObject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copySignUpUser = {
      ...signUpUser,
      [e.target.name]: e.target.value,
    }
    setSignUpUser(copySignUpUser)
    // update signin button UI
    setSignupButtonActive(
      copySignUpUser.firstName !== '' &&
        copySignUpUser.lastName !== '' &&
        copySignUpUser.email !== '' &&
        copySignUpUser.password !== ''
    )
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: signUpUser }),
      })
      // successful signup
      if (response.ok) {
        const data: BackendResponseUser = await response.json()
        dispatch(addUserToStore(data.user))
        // set jwt token to local storage
        localStorage.setItem('token', data.jwt)
        router.push(routeNames.MAP)
        setLoading(false)
      }
      // error with signup
      else {
        const data: SignUpBackendError = await response.json()
        setLoading(false)
        const copyError = { ...defaultError }
        for (let errorMessage of data.errors) {
          if (errorMessage.split(' ')[0] === 'Email') {
            copyError.email.push(errorMessage)
          } else if (errorMessage.split(' ')[0] === 'Password') {
            copyError.password.push(errorMessage)
          }
        }
        setError(copyError)
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className='overflow-hidden absolute top-0 bg-secondary h-screen w-screen flex flex-row items-center justify-center'>
      {/* Back Button */}
      <BackButton />
      {/* Image on Left Side */}
      <div className='hidden w-1/2 lg:flex justify-center items-center'>
        <div className='h-[80%] w-[40%] bg-white'></div>
      </div>
      {/* Form + Header + SignInButton */}
      <div className='z-10 w-[80%] md:w-[600px] bg-white globalRounded flex pt-14 pb-10 drop-shadow-2xl justify-center items-center'>
        <div className='flex flex-col space-y-8 w-2/3'>
          <h2 className='loginHeader'>Create your account</h2>
          <form className='flex flex-col' onSubmit={handleSignUp}>
            <label htmlFor='firstName' className='formLabel'>
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              className='loginFormInput'
              value={signUpUser.firstName}
              onChange={updateUserObject}
            />
            <label htmlFor='lastName' className='formLabel'>
              Last Name
            </label>
            <input
              type='text'
              name='lastName'
              className='loginFormInput'
              value={signUpUser.lastName}
              onChange={updateUserObject}
            />
            <div className='flex justify-between'>
              <label htmlFor='email' className='formLabel'>
                Email
              </label>
              {error.email.length !== 0 && (
                <p className='loginErrorLabel'>{error.email[0]}</p>
              )}
            </div>
            <input
              type='text'
              name='email'
              className='loginFormInput'
              value={signUpUser.email}
              onChange={updateUserObject}
            />
            <div className='flex justify-between'>
              <label htmlFor='password' className='formLabel'>
                Password
              </label>
              {error.password.length !== 0 && (
                <p className='loginErrorLabel'>{error.password[0]}</p>
              )}
            </div>
            <input
              type='password'
              name='password'
              className='loginFormInput'
              value={signUpUser.password}
              onChange={updateUserObject}
            />
            <div className='mt-2 h-4 flow-root'>
              <a className='float-right loginForgotPassword'>
                Forgot Password?
              </a>
            </div>
            <button
              className={`${
                signupButtonActive ? 'bg-tertiary' : 'bg-tertiary/20'
              } mt-4 rounded-md p-3 text-white`}
              disabled={!signupButtonActive}
            >
              {loading ? <ButtonLoader /> : 'Create account'}
            </button>
          </form>
          {/* Sign Up Navigation */}
          <div className='flex flex-row items-center justify-center space-x-2'>
            <p className='text-sm text-gray-500'>Have an account? </p>
            <Link
              href={routeNames.LOGIN}
              className='text-sm text-tertiary font-bold cursor-pointer'
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {/* Background Diagonal Shape */}
      <div className='-rotate-45 absolute bottom-0 h-[50%] w-[200vw] bg-primary'></div>
    </div>
  )
}

export default Signup
