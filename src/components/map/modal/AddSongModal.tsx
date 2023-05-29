import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch, useEffect, useState } from 'react'
import ModalMap from './ModalMap'
import TrackCard from './TrackCard'
import TrackSearchBar from './TrackSearchBar'

const CLIENT_ID = '40ff9b6a103d498382bd8bf9b1809896'
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY

interface TokenResponse {
  access_token: string
}

interface AddSongModalProps {
  setModalOpen: Dispatch<boolean>
  userLocation: MapLocation | null
}

function AddSongModal({ setModalOpen, userLocation }: AddSongModalProps) {
  const [accessToken, setAccessToken] = useState<string>('')
  const [tracks, setTracks] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedTrack, setSelectedTrack] = useState<any>(null)

  useEffect(() => {
    const getToken = async () => {
      const authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      }

      try {
        const response = await fetch(
          'https://accounts.spotify.com/api/token',
          authParameters
        )
        const data: TokenResponse = await response.json()
        setAccessToken(data.access_token)
      } catch (error: any) {
        console.error('Error: ', error)
      }
    }

    getToken()
  }, [])

  const searchTracks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=10`,
        searchParameters
      )
      if (response.ok) {
        const data: { tracks: { items: any[] } } = await response.json()
        setTracks(data.tracks.items)
      } else {
        throw new Error('Error occurred while fetching data.')
      }
    } catch (error: any) {
      console.error('Error: ', error)
    }
  }

  const addSong = (track: any) => {}

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
          <TrackSearchBar
            searchTracks={searchTracks}
            setSearchInput={setSearchInput}
          />
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
                <h2 className='text-sm font-thin'>{selectedTrack.name}</h2>
                <p className='text-xs text-gray-400'>
                  by {selectedTrack.artists[0].name}
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <button
            onClick={() => {
              addSong(selectedTrack)
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
