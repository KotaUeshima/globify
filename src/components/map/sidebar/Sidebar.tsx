import { useAppSelector } from '@/src/redux/store'
import { BACKEND_URL } from '@/src/utils/constants'
import { ViewColumnsIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import SidebarTrackCard from './SidebarTrackCard'

function Sidebar({ changeCenter }: ChangeCenterProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [userSongs, setUserSongs] = useState<Song[]>([])
  const [selectedUserSong, setSelectedUserSong] = useState<Song | null>(
    null
  )

  const user: UserInterface = useAppSelector(state => state.user)

  useEffect(() => {
    const getUserSongs = async () => {
      const response = await fetch(`${BACKEND_URL}/user_songs/${user.id}`)
      const data: Song[] = await response.json()
      setUserSongs(data)
    }

    getUserSongs()
  }, [])

  return (
    <>
      {/* Button */}
      <div className='z-10 absolute top-24 right-5'>
        <button
          className='bg-secondary/90 hover:bg-secondary px-3 py-2 text-white globalRounded flex flex-row items-center space-x-2'
          onClick={() => {
            setOpen(true)
          }}
        >
          <ViewColumnsIcon className='h-6 w-6 text-white' />
          <p className='text-base font-light'>View My Songs</p>
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`${
          open ? 'translate-x-0' : 'translate-x-[110%]'
        } absolute top-24 right-5 z-10 h-[60%] w-[20vw] bg-secondary globalRounded ease-in-out duration-1000 overflow-y-auto`}
      >
        {/* Sidebar Navigation */}
        <div className='h-10 mt-2 mx-4 flex justify-between items-center'>
          <h2 className='text-white text-2xl font-medium'>My Songs</h2>
          <XMarkIcon
            onClick={() => setOpen(false)}
            className='h-6 w-6 rounded-full hover:bg-white hover:text-secondary globalTransition cursor-pointer'
          />
        </div>
        {/* User Song List */}
        <div className='flex flex-col space-y-3 p-3'>
          {userSongs.map(userSong => {
            return (
              <SidebarTrackCard
                key={userSong.id}
                userSong={userSong}
                selectedUserSong={selectedUserSong}
                setSelectedUserSong={setSelectedUserSong}
                changeCenter={changeCenter}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebar
