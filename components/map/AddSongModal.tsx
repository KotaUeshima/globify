import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const CLIENT_ID = '40ff9b6a103d498382bd8bf9b1809896'
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY

interface TokenResponse {
  access_token: string
}

function AddSongModal() {
  const [accessToken, setAccessToken] = useState<string>('')
  const [tracks, setTracks] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedSongForColor, setSelectedSongForColor] = useState(null)

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
    <div className='h-screen w-screen fixed inset-0 bg-gray-300/50 flex justify-center items-center'>
      {/* Actual Modal */}
      <div className='flex bg-secondary px-4 pb-4 pt-5 globalRounded'>
        <form onSubmit={searchTracks} className='flex items-center'>
          <div className='relative w-full'>
            {/* Search Icon Inside Input */}
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <MagnifyingGlassIcon className='h-6 w-6 text-secondary' />
            </div>
            <input
              type='text'
              className='bg-gray-50 text-gray-900 border border-gray-300 text-sm globalRounded focus:outline-none block w-full pl-10 p-2.5'
              placeholder='Search Artist/Song'
              onChange={event => {
                setSearchInput(event.target.value)
              }}
              required
            />
          </div>
          <button
            type='submit'
            className='p-2.5 ml-2 text-sm font-medium bg-white globalRounded text-secondary hover:text-white hover:bg-primary ease-in-out duration-700 focus:outline-none'
          >
            <MagnifyingGlassIcon className='h-6 w-6' />
          </button>
        </form>
        {/* Search Results */}
        <div></div>
      </div>
    </div>
  )
}

export default AddSongModal
