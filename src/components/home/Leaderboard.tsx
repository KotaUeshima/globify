import { BACKEND_URL } from '@/src/utils/constants'
import { useEffect, useState } from 'react'

function Leaderboard() {
  const [topFiveSongs, setTopFiveSongs] = useState<any[]>([
    ['', '', '', -1],
    ['', '', '', -1],
    ['', '', '', -1],
    ['', '', '', -1],
    ['', '', '', -1],
  ])

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
      <div className='my-2 w-full flex justify-center'>
        <h2 className='text-5xl tracking-wider font-medium text-secondary text-center py-6 w-full globalRounded bg-tertiary'>
          Leaderboard
        </h2>
      </div>
      {topFiveSongs.map((song, index) => {
        return (
          <LeaderboardCard key={Math.random()} index={index} song={song} />
        )
      })}
    </div>
  )
}

interface LeaderboardCardProps {
  index: number
  song: any
}

function LeaderboardCard({ index, song }: LeaderboardCardProps) {
  const place = '0' + String(index + 1)
  const title = song[0]
  const artist = song[1]
  const image = song[2]
  let number = song[3]
  if (number === -1) {
    number = ''
  } else if (number === 1) {
    number = number + 'pt'
  } else {
    number = number + 'pts'
  }

  return (
    <>
      <hr className='h-[2px] w-full' />
      <div className='grid grid-cols-8 gap-4'>
        <h2 className='leaderboardText flex items-center'>{place}</h2>
        <div className='leaderboardText col-span-3 flex flex-row items-center space-x-2'>
          <img
            src={image}
            alt={title}
            className='h-14 w-14 rounded-full'
          />
          <h2>{title}</h2>
        </div>
        <h2 className='leaderboardText col-span-3 flex items-center'>
          {artist}
        </h2>
        <h2 className='leaderboardText flex items-center'>{number}</h2>
      </div>
    </>
  )
}

export default Leaderboard
