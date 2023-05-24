interface TrackCardProps {
  track: any
}

function TrackCard({ track }: TrackCardProps) {
  const name = track.name
  const artist = track.artists[0].name
  const image_url = track.album.images[0].url

  return (
    <div className='mt-2 flex flex-row globalRounded hover:bg-gray-500 globalTransition'>
      <img src={image_url} alt='album-cover' className='w-24' />
      <div className='ml-4 flex flex-col'>
        <h2 className='text-2xl font-thin'>{name}</h2>
        <p className='text-lg text-gray-400'>by {artist}</p>
      </div>
    </div>
  )
}

export default TrackCard
