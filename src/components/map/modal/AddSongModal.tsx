import { useAppSelector } from '@/src/redux/store'
import { BACKEND_URL } from '@/src/utils/constants'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch, useState } from 'react'
import ModalMap from './ModalMap'
import TrackCard from './TrackCard'
import TrackSearchBar from './TrackSearchBar'

interface AddSongModalProps {
  setModalOpen: Dispatch<boolean>
  userLocation: MapLocation | null
}

function AddSongModal({ setModalOpen, userLocation }: AddSongModalProps) {
  const [tracks, setTracks] = useState<any[]>([])
  const [selectedTrack, setSelectedTrack] = useState<any>(null)

  const user: UserInterface = useAppSelector(state => state.user)

  const addSong = async () => {
    if (userLocation) {
      const songObj = {
        title: selectedTrack.name,
        artist: selectedTrack.artists[0].name,
        user_id: user.userId,
        image_url: selectedTrack.album.images[0].url,
        lat: userLocation.lat,
        lng: userLocation.lng,
        spotify_url: `${selectedTrack.external_urls.spotify.substring(
          0,
          25
        )}embed/${selectedTrack.external_urls.spotify.substring(
          25
        )}?utm_source=generator`,
      }

      console.log(songObj)

      const addSongParams = {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songObj),
      }

      const response = await fetch(`${BACKEND_URL}/songs`, addSongParams)
      const data = await response.json()
      console.log(data)
    }
  }

  return (
    <div className='z-20 h-full w-screen fixed inset-0 bg-gray-600/50 flex justify-center items-center'>
      {/* Actual Modal */}
      <div className='h-[75vh] w-1/3 flex flex-col bg-secondary px-4 pb-4 globalRounded'>
        {/* Navigation Bar */}
        <div className='h-10 py-2 flex justify-end items-center'>
          <XMarkIcon
            onClick={() => setModalOpen(false)}
            className='h-6 w-6 rounded-full hover:bg-white hover:text-secondary globalTransition cursor-pointer'
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
              <h2 className='text-3xl font-thin text-gray-400 text-center'>
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
                <p className='text-xs font-thin text-gray-200'>
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
            className={`px-3 py-2 globalRounded font-light ${
              selectedTrack ? 'bg-primary' : 'bg-primary/50'
            }`}
            disabled={selectedTrack ? false : true}
          >
            Add Song
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSongModal
