import { zoomLevel } from '@/src/utils/constants'
import { TrashIcon } from '@heroicons/react/24/solid'
import { Dispatch } from 'react'

interface SidebarTrackCardProps extends ChangeCenterProps {
  userSong: Song
  selectedUserSong: Song | null
  setSelectedUserSong: Dispatch<Song>
  setOpenDeleteModal: Dispatch<[boolean, number]>
}

function SidebarTrackCard({
  userSong,
  selectedUserSong,
  setSelectedUserSong,
  changeCenter,
  setOpenDeleteModal,
}: SidebarTrackCardProps) {
  return (
    <>
      <div
        className={`${
          selectedUserSong && selectedUserSong.id === userSong.id
            ? 'bg-primary text-secondary'
            : 'bg-transparent hover:bg-primary hover:text-secondary'
        } relative mt-2 p-2 flex flex-row globalRounded globalTransition`}
        onClick={() => {
          setSelectedUserSong(userSong)
          changeCenter(
            { lat: userSong.lat, lng: userSong.lng },
            zoomLevel.CLOSE
          )
        }}
      >
        <img
          src={userSong.image_url}
          alt='album-cover'
          className='h-24 w-24 globalRounded'
        />
        <div className='ml-4 flex flex-col mr-4'>
          <h2 className='text-base font-normal'>{userSong.title}</h2>
          <p className='text-sm font-normal text-gray-400'>
            by {userSong.artist}
          </p>
          <div className='absolute right-2 bottom-2'>
            <button
              onClick={e => {
                e.stopPropagation()
                setOpenDeleteModal([true, userSong.id])
              }}
            >
              <TrashIcon className='basicIconSize text-tertiary' />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarTrackCard
