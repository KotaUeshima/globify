import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'

function AudioPlayer({ src }: { src: string }) {
  const [play, setPlay] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const MAX = 20

  const toggleAudio = () => {
    if (play) {
      audioRef.current?.pause()
      setPlay(false)
    } else {
      audioRef.current?.play()
      setPlay(true)
    }
  }

  // set play back to false each time new song is clicked
  useEffect(() => {
    setPlay(false)
  }, [src])

  return (
    <div>
      <audio ref={audioRef} src={src} onEnded={() => setPlay(false)} />
      <button onClick={toggleAudio} disabled={src === ''}>
        {play ? (
          <PauseIcon className='h-10 w-10 text-secondary' />
        ) : (
          <PlayIcon
            className={`h-10 w-10 ${
              src === '' ? 'text-secondary/70' : 'text-secondary'
            }`}
          />
        )}
      </button>
    </div>
  )
}

export default AudioPlayer
