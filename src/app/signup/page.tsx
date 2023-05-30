'use client'
import BackButton from '@/src/components/BackButton'
import { routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import React, { useState } from 'react'

function Signup() {
  interface SignUpUser {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  const defaultSignUpUser: SignUpUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const [signUpUser, setSignUpUser] =
    useState<SignUpUser>(defaultSignUpUser)
  const [error, setError] = useState<string>('')

  //   const router = useRouter()

  const UpdateUserObject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copySignUpUser = {
      ...signUpUser,
      [e.target.name]: e.target.value,
    }
    setSignUpUser(copySignUpUser)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className='absolute top-0 bg-secondary min-h-screen w-screen flex flex-row items-center justify-center'>
      {/* Back Button */}
      <BackButton />
      {/* Image on Left Side */}
      <div className='w-1/2 flex justify-center items-center'>Hello</div>
      {/* Form + Header + SignInButton */}
      <div className='w-[40%] bg-white globalRounded flex pt-14 pb-10 drop-shadow-2xl justify-center items-center'>
        <div className='flex flex-col space-y-8 w-2/3'>
          <h2 className='loginHeader'>Create your account</h2>
          <form className='flex flex-col' onSubmit={handleSignUp}>
            <label htmlFor='email' className='formLabel'>
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              className='loginFormInput'
              value={signUpUser.firstName}
              onChange={UpdateUserObject}
            />
            <label htmlFor='email' className='formLabel'>
              Last Name
            </label>
            <input
              type='text'
              name='lastName'
              className='loginFormInput'
              value={signUpUser.lastName}
              onChange={UpdateUserObject}
            />
            <label htmlFor='email' className='formLabel'>
              Email
            </label>
            <input
              type='text'
              name='email'
              className='loginFormInput'
              value={signUpUser.email}
              onChange={UpdateUserObject}
            />
            <label htmlFor='email' className='formLabel'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='loginFormInput'
              value={signUpUser.password}
              onChange={UpdateUserObject}
            />
            <div className='mt-2 h-10 lg:h-4 flex flex-col lg:flow-root'>
              <p className='h-4 float-left text-sm text-errorRed'>
                {error}
              </p>
              <a className='float-right text-sm text-primary/80 font-bold cursor-pointer'>
                Forgot Password?
              </a>
            </div>
            <button className='mt-4 rounded-md p-3 text-white bg-primary/20 hover:bg-primary ease-in-out duration-500'>
              Create account
            </button>
          </form>
          {/* Sign Up Navigation */}
          <div className='flex flex-row items-center justify-center space-x-2'>
            <p className='text-sm text-gray-500'>Have an account? </p>
            <Link
              href={routeNames.LOGIN}
              className='text-sm text-primary/80 font-bold cursor-pointer'
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
