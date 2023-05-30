function HomeTrackCard() {
  return (
    <div className='p-4 flex flex-row bg-gray-300 globalRounded'>
      <img
        src='https://i.scdn.co/image/ab67616d0000b27351f311c2fb06ad2789e3ff91'
        alt='album-cover'
        className='w-10 rounded-md'
      />
      <div className='ml-4 flex flex-col mr-4'>
        <h2 className='text-sm font-light text-black'>
          Have You Ever Seen The Rain
        </h2>
        <p className='text-xs font-thin text-black'>
          by Creedence Clearwater Revivals
        </p>
      </div>
    </div>
  )
}

export default HomeTrackCard
