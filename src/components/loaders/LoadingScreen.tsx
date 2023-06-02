import { HashLoader } from 'react-spinners'

function LoadingScreen() {
  return (
    <div className='h-[90vh] w-screen bg-secondary flex justify-center items-center'>
      <HashLoader color={'white'} size={100} />
    </div>
  )
}

export default LoadingScreen
