import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

function BackButton() {
  const router = useRouter()

  return (
    <button
      className='z-10 absolute top-5 left-5'
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className='h-6 w-6 text-primary' />
    </button>
  )
}

export default BackButton
