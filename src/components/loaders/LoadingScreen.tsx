import { HashLoader } from 'react-spinners'

function LoadingScreen() {
  return (
    <div className='h-[90vh] w-screen flex justify-center items-center'>
      <HashLoader color={'black'} size={100} />
    </div>
  )
}

export default LoadingScreen
