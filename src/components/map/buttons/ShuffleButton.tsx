import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface ShuffleButtonProps {
  songs: Song[]
  selectAndGoToSong: (song: Song) => void
}

function ShuffleButton({ songs, selectAndGoToSong }: ShuffleButtonProps) {
  const shuffleSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length)
    const randomSong = songs[randomIndex]
    selectAndGoToSong(randomSong)
  }

  return (
    <button className='mapButton' onClick={shuffleSong}>
      <ArrowPathIcon className='mapButtonIcon' />
    </button>
  )
}

export default ShuffleButton
