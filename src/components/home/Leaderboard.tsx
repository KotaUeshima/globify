import { BACKEND_URL } from '@/src/utils/constants'
import { useEffect, useState } from 'react'

function Leaderboard() {
  const [topFiveSongs, setTopFiveSongs] = useState<any[]>([])

  useEffect(() => {
    const getTopFive = async () => {
      const response = await fetch(`${BACKEND_URL}/top_five`)
      const data = await response.json()
      setTopFiveSongs(data)
    }
    getTopFive()
  }, [])

  return (
    <div className='flex flex-col space-y-4'>
      <h1 className='text-4xl font-normal'>Leaderboard</h1>
      <div className='mt-10 grid grid-cols-6 gap-10'>
        <h2 className='leaderboardTitleText'>Place</h2>
        <h2 className='leaderboardTitleText col-span-2'>Title</h2>
        <h2 className='leaderboardTitleText col-span-2'>Artist</h2>
        <h2 className='leaderboardTitleText'>Posts</h2>
      </div>
      {topFiveSongs.map((song, index) => {
        return <LeaderboardCard key={song[0]} index={index} song={song} />
      })}
    </div>
  )
}

interface LeaderboardCardProps {
  index: number
  song: any
}

function LeaderboardCard({ index, song }: LeaderboardCardProps) {
  const place = index + 1
  const title = song[0]
  const artist = song[1]
  const image = song[2]
  const number = song[3]

  return (
    <>
      <hr className='h-[2px] w-full' />
      <div className='grid grid-cols-6 gap-10'>
        <h2 className='leaderboardText'>{place}</h2>
        <div className='leaderboardText col-span-2 flex flex-row space-x-2'>
          <img
            src={image}
            alt={title}
            className='h-14 w-14 rounded-full'
          />
          <h2>{title}</h2>
        </div>
        <h2 className='leaderboardText col-span-2'>{artist}</h2>
        <h2 className='leaderboardText'>{number}</h2>
      </div>
    </>
  )
}

export default Leaderboard
