import { useEffect, useState } from 'react'
import AudioPlayer from './AudioPlayer'

interface SelectedSongPlayerProps {
  selectedMarker: Song | null
}

function SelectedSongPlayer({ selectedMarker }: SelectedSongPlayerProps) {
  const [showFullName, setShowFullName] = useState<boolean>(false)

  // set full name to false each time a new marker is clicked
  useEffect(() => {
    setShowFullName(false)
  }, [selectedMarker])

  const firstName = selectedMarker?.user.firstName || ''
  const lastName = selectedMarker?.user.lastName || ''
  const preview = selectedMarker?.spotify_url || ''

  return (
    <div className='relative w-3/4 bg-primary globalRounded'>
      {selectedMarker ? (
        <div
          className={`h-full w-full flex flex-col justify-center items-center`}
        >
          <div className='absolute top-3 right-3'>
            <div
              onMouseEnter={() => {
                setTimeout(() => {
                  setShowFullName(true)
                }, 300)
              }}
              onMouseLeave={() => setShowFullName(false)}
              className='h-8 w-8 hover:w-32 ease-in-out duration-1000 rounded-full flex justify-center items-center cursor-pointer text-secondary text-xs font-light bg-tertiary'
            >
              {showFullName
                ? firstName + ' ' + lastName
                : firstName.substring(0, 1) + lastName.substring(0, 1)}
            </div>
          </div>
          <img
            src={selectedMarker.image_url}
            alt='song-picture'
            className='mt-4 w-1/2 globalRounded'
          />
          <div className='w-4/5 mt-4 flex flex-col'>
            <h2 className='text-lg font-medium text-secondary'>
              {selectedMarker.title}
            </h2>
            <p className='text-base font-light text-gray-400'>
              by {selectedMarker.artist}
            </p>
          </div>
          <div className='mt-2'>
            <AudioPlayer src={preview} />
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex justify-center items-center'>
          <h2 className='text-secondary text-center text-lg font-light'>
            Select a Song on the Map
          </h2>
        </div>
      )}
    </div>
  )
}

export default SelectedSongPlayer
