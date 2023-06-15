import { useAppSelector } from '@/src/redux/store'
import { BACKEND_URL } from '@/src/utils/constants'
import { ViewColumnsIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch, useEffect, useState } from 'react'
import DeleteModal from './DeleteModal'
import SidebarTrackCard from './SidebarTrackCard'

interface SidebarProps {
  setSongs: Dispatch<Song[]>
  songs: Song[]
  selectAndGoToSong: (song: Song) => void
}

function Sidebar({ setSongs, songs, selectAndGoToSong }: SidebarProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState<
    [boolean, number]
  >([false, -1])
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

  const deleteSong = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/songs/${openDeleteModal[1]}`,
        {
          method: 'DELETE',
        }
      )
      if (response.ok) {
        const filteredSongs = songs.filter(
          song => song.id !== openDeleteModal[1]
        )
        setSongs(filteredSongs)
      }
    } catch (e: any) {
      console.error(e)
    }

    setOpenDeleteModal([false, -1])
  }

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
        } absolute top-24 right-5 z-10 h-[500px] w-[350px] bg-secondary globalRounded ease-in-out duration-1000 overflow-y-auto`}
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
                setOpenDeleteModal={setOpenDeleteModal}
                selectAndGoToSong={selectAndGoToSong}
              />
            )
          })}
        </div>
      </div>
      {openDeleteModal[0] && (
        <DeleteModal
          deleteSong={deleteSong}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </>
  )
}

export default Sidebar
