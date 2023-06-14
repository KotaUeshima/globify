import { useAppSelector } from '@/src/redux/store'
import { BACKEND_URL } from '@/src/utils/constants'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch, useState } from 'react'
import ModalMap from './ModalMap'
import TrackCard from './TrackCard'
import TrackSearchBar from './TrackSearchBar'

interface AddSongModalProps {
  setModalOpen: Dispatch<boolean>
  userLocation: MapLocation | null
  addSongLocally: (song: Song) => void
}

function AddSongModal({
  setModalOpen,
  userLocation,
  addSongLocally,
}: AddSongModalProps) {
  const [tracks, setTracks] = useState<any[]>([])
  const [selectedTrack, setSelectedTrack] = useState<any>(null)

  const user: UserInterface = useAppSelector(state => state.user)

  const addSong = async () => {
    if (userLocation) {
      const songObj = {
        title: selectedTrack.name,
        artist: selectedTrack.artists[0].name,
        user_id: user.id,
        image_url: selectedTrack.album.images[0].url,
        lat: userLocation.lat,
        lng: userLocation.lng,
        spotify_url: selectedTrack.preview_url,
      }

      const addSongParams = {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songObj),
      }

      const response = await fetch(`${BACKEND_URL}/songs`, addSongParams)
      const data: Song = await response.json()
      addSongLocally(data)
    }
  }

  return (
    <div className='z-20 h-full w-screen fixed inset-0 modalBackground flex justify-center items-center'>
      {/* Actual Modal */}
      <div className='h-[75vh] w-3/4 md:w-[500px] flex flex-col bg-secondary px-4 pb-4 globalRounded'>
        {/* Navigation Bar */}
        <div className='h-10 py-2 flex justify-end items-center'>
          <XMarkIcon
            onClick={() => setModalOpen(false)}
            className='basicIconSize rounded-full hover:bg-primary hover:text-secondary globalTransition cursor-pointer'
          />
        </div>
        {/* Search Bar */}
        <div>
          <TrackSearchBar setTracks={setTracks} />
        </div>
        {/* Search Results Area */}
        <div className='mt-2 overflow-y-auto h-[75%] globalRounded'>
          {tracks.length > 0 ? (
            tracks.map(track => {
              return (
                <TrackCard
                  key={track.id}
                  track={track}
                  selectedTrack={selectedTrack}
                  setSelectedTrack={setSelectedTrack}
                />
              )
            })
          ) : (
            <div className='h-full w-full flex justify-center items-center'>
              <h2 className='text-3xl font-light text-gray-400 text-center'>
                Search Songs to See Results
              </h2>
            </div>
          )}
        </div>
        {/* Map Area */}
        <ModalMap userLocation={userLocation} />
        {/* Submit Song Area */}
        <div className='mt-2 flex flex-row justify-between items-center'>
          {selectedTrack ? (
            <div className='flex flex-row globalRounded'>
              <img
                src={selectedTrack.album.images[0].url}
                alt='album-cover'
                className='w-10 rounded-md'
              />
              <div className='ml-4 flex flex-col mr-4'>
                <h2 className='text-sm font-light'>
                  {selectedTrack.name}
                </h2>
                <p className='text-xs font-light text-gray-400'>
                  by {selectedTrack.artists[0].name}
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <button
            onClick={() => {
              addSong()
              setModalOpen(false)
            }}
            className={`px-3 py-2 globalRounded text-secondary ${
              selectedTrack ? 'bg-primary' : 'bg-primary/70'
            }`}
            disabled={selectedTrack ? false : true}
          >
            <PlusIcon className='basicIconSize' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSongModal
