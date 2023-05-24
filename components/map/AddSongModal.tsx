import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import TrackCard from './TrackCard'
import TrackSearchBar from './TrackSearchBar'

const CLIENT_ID = '40ff9b6a103d498382bd8bf9b1809896'
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY

interface TokenResponse {
  access_token: string
}

function AddSongModal() {
  const [accessToken, setAccessToken] = useState<string>('')
  const [tracks, setTracks] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedSong, setSelectedSong] = useState('')

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
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=20`,
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

  return (
    <div className='h-screen w-screen z-20 fixed inset-0 bg-gray-300/50 flex justify-center items-center'>
      {/* Actual Modal */}
      <div className='max-h-[50vh] w-1/3 flex flex-col bg-secondary px-4 pb-4 globalRounded overflow-y-auto'>
        {/* Navigation Bar */}
        <div className='h-10 py-2 flex justify-end items-center'>
          <XMarkIcon className='h-6 w-6 rounded-full hover:bg-white hover:text-secondary globalTransition' />
        </div>
        {/* Search Bar */}
        <div>
          <TrackSearchBar
            searchTracks={searchTracks}
            setSearchInput={setSearchInput}
          />
        </div>
        {/* Search Results Area */}
        <div className='mt-2'>
          {tracks.map(track => {
            return <TrackCard key={track.id} track={track} />
          })}
        </div>
        {/* Submit Song Area */}
      </div>
    </div>
  )
}

export default AddSongModal
