'use client'
import BackButton from '@/src/components/BackButton'
import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch } from '@/src/redux/store'
import { BACKEND_URL, routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Login() {
  interface LoginUser {
    username: string
    password: string
  }

  const defaultLoginUser: LoginUser = {
    username: '',
    password: '',
  }

  const [loginUser, setLoginUser] = useState<LoginUser>(defaultLoginUser)
  const [error, setError] = useState<string>('')
  // for Next.js routing
  const router = useRouter()
  // to dispatch to Redux Store
  const dispatch = useAppDispatch()

  const UpdateUserObject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyLoginUser = {
      ...loginUser,
      [e.target.name]: e.target.value,
    }
    setLoginUser(copyLoginUser)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(
          addUserToStore({
            userId: data.user.id,
            username: data.user.username,
          })
        )
        // set jwt token to local storage
        localStorage.setItem('token', data.jwt)
        router.push(routeNames.MAP)
      }
      // error with login
      else {
        const data: BackendError = await response.json()
        throw Error(data.error)
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className='absolute top-0 bg-secondary min-h-screen w-screen flex flex-row justify-center items-center'>
      {/* Back Button */}
      <BackButton />
      {/* White Box */}
      <div className='w-[40%] bg-white globalRounded flex pt-14 pb-10 drop-shadow-2xl justify-center items-center'>
        {/* Form + Header + SignInButton */}
        <div className='flex flex-col space-y-8 w-2/3'>
          <h2 className='loginHeader'>Welcome Back!</h2>
          <form
            className='flex flex-col text-black'
            onSubmit={handleSignUp}
          >
            <label htmlFor='username' className='text-sm text-black/80'>
              Username
            </label>
            <input
              type='text'
              name='username'
              className='loginFormInput'
              value={loginUser.username}
              onChange={UpdateUserObject}
            />
            <label htmlFor='password' className='text-sm text-black/80'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='loginFormInput'
              value={loginUser.password}
              onChange={UpdateUserObject}
            />
            <div className='mt-2 h-10 lg:h-4 flex flex-col lg:flow-root'>
              <p className='h-5 float-left text-sm text-errorRed'>
                {error}
              </p>
              <a className='float-right text-sm text-primary/80 font-bold cursor-pointer'>
                Forgot Password?
              </a>
            </div>
            <button className='mt-4 rounded-md p-3 text-white bg-primary/20 hover:bg-primary ease-in-out duration-500'>
              Login
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
            className='text-white bg-red-400 font-medium rounded-md text-sm p-3 text-center inline-flex items-center justify-between'
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
              Don't have an account yet?{' '}
            </p>
            <Link
              href={routeNames.SIGNUP}
              className='text-sm text-primary/80 font-bold cursor-pointer'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
