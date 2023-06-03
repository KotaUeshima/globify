interface SelectedSongPlayerProps {
  selectedMarker: Song | null
}

function SelectedSongPlayer({ selectedMarker }: SelectedSongPlayerProps) {
  return (
    <div className='w-3/4 bg-gray-100 globalRounded'>
      {selectedMarker ? (
        <div
          className={`h-full w-full flex flex-col justify-center items-center`}
        >
          <img
            src={selectedMarker.image_url}
            alt='song-picture'
            className='w-1/2 globalRounded'
          />
          <div className='w-4/5 mt-4 flex flex-col'>
            <h2 className='text-xl font-medium text-secondary'>
              {selectedMarker.title}
            </h2>
            <p className='text-base font-light text-gray-400'>
              by {selectedMarker.artist}
            </p>
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex justify-center items-center'>
          <h2 className='text-primary text-center text-lg font-light'>
            Select a Song on the Map
          </h2>
        </div>
      )}
    </div>
  )
}

export default SelectedSongPlayer
