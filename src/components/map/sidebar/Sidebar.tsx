import { useAppSelector } from '@/src/redux/store'
import { ViewColumnsIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import SidebarTrackCard from './SidebarTrackCard'

interface SidebarProps extends ChangeCenterProps {
  songs: Song[]
}

function Sidebar({ changeCenter, songs }: SidebarProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [userSongs, setUserSongs] = useState<Song[]>([])
  const [selectedUserSong, setSelectedUserSong] = useState<Song | null>(
    null
  )

  const user: UserInterface = useAppSelector(state => state.user)

  useEffect(() => {
    const getUserSongs = async () => {
      const filteredSongs = songs.filter(
        song => parseInt(song.user_id) === user.id
      )
      setUserSongs(filteredSongs)
    }

    getUserSongs()
  }, [songs])

  return (
    <>
      {/* Button */}
      <div className='z-10 absolute top-24 right-5'>
        <button
          className='px-3 py-2 bg-primary text-secondary globalRounded flex flex-col items-center space-x-2'
          onClick={() => {
            setOpen(true)
          }}
        >
          <ViewColumnsIcon className='h-10 w-10' />
          <p className='text-base font-light'>My Songs</p>
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`${
          open ? 'translate-x-0' : 'translate-x-[110%]'
        } absolute top-24 right-5 z-10 h-[500px] w-[350px] bg-secondary globalRounded globalTransition overflow-y-auto`}
      >
        {/* Sidebar Navigation */}
        <div className='h-10 mt-2 mx-4 flex justify-between items-center'>
          <h2 className='px-4 py-2 bg-primary text-secondary globalRounded text-xl font-medium'>
            My Songs
          </h2>
          <XMarkIcon
            onClick={() => setOpen(false)}
            className='basicIconSize rounded-full hover:bg-primary hover:text-secondary globalTransition cursor-pointer'
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
