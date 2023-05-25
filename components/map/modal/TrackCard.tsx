import { Dispatch } from 'react'

interface TrackCardProps {
  track: any
  selectedTrack: any
  setSelectedTrack: Dispatch<any>
}

function TrackCard({
  track,
  selectedTrack,
  setSelectedTrack,
}: TrackCardProps) {
  const name = track.name
  const artist = track.artists[0].name
  const image_url = track.album.images[0].url

  return (
    <div
      className={`${
        selectedTrack && selectedTrack.id === track.id
          ? 'bg-gray-700'
          : 'bg-transparent hover:bg-gray-500'
      } mt-2 flex flex-row globalRounded  globalTransition`}
      onClick={() => {
        setSelectedTrack(track)
      }}
    >
      <img
        src={image_url}
        alt='album-cover'
        className='w-24 rounded-l-md'
      />
      <div className='ml-4 flex flex-col mr-4'>
        <h2 className='text-xl font-thin'>{name}</h2>
        <p className='text-base text-gray-400'>by {artist}</p>
      </div>
    </div>
  )
}

export default TrackCard
