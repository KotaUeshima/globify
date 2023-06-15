'use client'
import BackButton from '@/src/components/layout/BackButton'
import ButtonLoader from '@/src/components/loaders/ButtonLoader'
import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch } from '@/src/redux/store'
import { BACKEND_URL, routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Login() {
  const defaultLoginUser: LoginUser = {
    email: '',
    password: '',
  }

  const defaultLoginError: LoginError = {
    email: '',
    password: '',
  }

  const [loginUser, setLoginUser] = useState<LoginUser>(defaultLoginUser)
  const [loginButtonActive, setLoginButtonActive] =
    useState<boolean>(false)
  const [error, setError] = useState<LoginError>(defaultLoginError)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const updateUserObject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyLoginUser = {
      ...loginUser,
      [e.target.name]: e.target.value,
    }
    setLoginUser(copyLoginUser)
    // update login button UI
    setLoginButtonActive(
      copyLoginUser.email !== '' && copyLoginUser.password !== ''
    )
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: loginUser }),
      })
      // successful login
      if (response.ok) {
        const data: BackendResponseUser = await response.json()
        dispatch(addUserToStore(data.user))
        // set jwt token to local storage
        localStorage.setItem('token', data.jwt)
        router.push(routeNames.MAP)
        setLoading(false)
      }
      // error with login
      else {
        const data: LoginBackendError = await response.json()
        throw Error(data.error)
      }
    } catch (e: any) {
      console.error(e)
      setLoading(false)
      if (e.message === 'Invalid password') {
        setError({ email: '', password: 'Invalid password' })
      } else if (e.message === 'Email does not exist') {
        setError({ email: 'Email does not exist', password: '' })
      }
    }
  }

  return (
    <div className='overflow-hidden absolute top-0 bg-secondary h-screen w-screen flex flex-row justify-center items-center'>
      {/* Back Button */}
      <BackButton />
      {/* White Box */}
      <div className='z-10 w-[80%] md:w-[550px] bg-white globalRounded flex pt-14 pb-10 drop-shadow-2xl justify-center items-center'>
        {/* Form + Header + SignInButton */}
        <div className='flex flex-col space-y-8 w-2/3'>
          <h2 className='loginHeader'>Welcome Back!</h2>
          <form
            className='flex flex-col text-black'
            onSubmit={handleSignUp}
          >
            <div className='flex justify-between'>
              <label htmlFor='email' className='text-sm text-black/80'>
                Email
              </label>
              {error.email && (
                <p className='loginErrorLabel'>{error.email}</p>
              )}
            </div>
            <input
              type='text'
              name='email'
              className='loginFormInput'
              value={loginUser.email}
              onChange={updateUserObject}
            />
            <div className='flex justify-between'>
              <label htmlFor='password' className='text-sm text-black/80'>
                Password
              </label>
              {error.password && (
                <p className='loginErrorLabel'>{error.password}</p>
              )}
            </div>
            <input
              type='password'
              name='password'
              className='loginFormInput'
              value={loginUser.password}
              onChange={updateUserObject}
            />
            <div className='mt-2 h-4 flow-root'>
              <a className='float-right loginForgotPassword'>
                Forgot Password?
              </a>
            </div>
            <button
              className={`${
                loginButtonActive ? 'bg-tertiary' : 'bg-tertiary/20'
              } mt-4 rounded-md p-3 text-white`}
              disabled={!loginButtonActive}
            >
              {loading ? <ButtonLoader /> : 'Login'}
            </button>
          </form>
          {/* --- or --- */}
          <div className='flex flex-row items-center justify-center space-x-4'>
            <hr className='w-full' />
            <p className='text-center text-gray-500'>or</p>
            <hr className='w-full' />
          </div>
          {/* Google Sign In Button from Online*/}
          <button
            type='button'
            disabled={true}
            className='text-white bg-red-400/50 font-medium rounded-md text-sm p-3 text-center inline-flex items-center justify-between'
          >
            <svg
              className='mr-2 ml-4 w-4 h-6'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='google'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
            >
              <path
                fill='currentColor'
                d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
              ></path>
            </svg>
            Sign up with Google<div></div>
          </button>
          {/* Sign Up Navigation */}
          <div className='flex flex-row items-center justify-center space-x-2'>
            <p className='text-sm text-gray-500'>
              Don&apos;t have an account yet?
            </p>
            <Link
              href={routeNames.SIGNUP}
              className='text-sm text-tertiary font-bold cursor-pointer'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* Background Diagonal Shape */}
      <div className='-rotate-45 absolute bottom-10 h-[50%] w-[200vw] bg-primary '></div>
    </div>
  )
}

export default Login
