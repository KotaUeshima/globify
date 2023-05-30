import { useEffect } from 'react'
import { addUserToStore } from '../features/users/userSlice'
import { useAppDispatch } from '../redux/store'
import { BACKEND_URL } from './constants'

const authorization = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch(`${BACKEND_URL}/authorized`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // user already logged in
      if (response.ok) {
        const data = await response.json()
        dispatch(
          addUserToStore({
            userId: data.user.id,
            username: data.user.username,
          })
        )
      }
    }

    checkUser()
  }, [])
}

export default authorization
