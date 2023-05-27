import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Dispatch } from 'react'
interface TrackSearchBarProps {
  searchTracks: (e: React.FormEvent<HTMLFormElement>) => void
  setSearchInput: Dispatch<string>
}

function TrackSearchBar({
  searchTracks,
  setSearchInput,
}: TrackSearchBarProps) {
  return (
    <form onSubmit={searchTracks} className='flex items-center'>
      <div className='relative w-full'>
        {/* Search Icon Inside Input */}
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <MagnifyingGlassIcon className='h-6 w-6 text-secondary' />
        </div>
        <input
          type='text'
          className='h-12 bg-gray-50 text-gray-900 border border-gray-300 text-lg globalRounded focus:outline-none block w-full pl-10 p-2.5'
          placeholder='Search Artist/Song'
          onChange={event => {
            setSearchInput(event.target.value)
          }}
        />
      </div>
      <button
        type='submit'
        className='h-12 p-2.5 ml-2 bg-white globalRounded text-secondary hover:text-white hover:bg-primary globalTransition focus:outline-none'
      >
        <MagnifyingGlassIcon className='h-6 w-6' />
      </button>
    </form>
  )
}

export default TrackSearchBar
