interface SelectedSongPlayerProps {
  selectedMarker: Song | null
}

function SelectedSongPlayer({ selectedMarker }: SelectedSongPlayerProps) {
  return (
    <div className='w-full'>
      {selectedMarker ? (
        <div className='w-full flex flex-col items-center'>
          <img
            src={selectedMarker.image_url}
            alt='song-picture'
            className='w-3/4 globalRounded'
          />
          <div className='w-3/4 mt-4 flex flex-col'>
            <h2 className='text-xl font-thin'>{selectedMarker.title}</h2>
            <p className='text-base text-gray-400'>
              by {selectedMarker.artist}
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default SelectedSongPlayer
