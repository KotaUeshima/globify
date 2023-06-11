import { PuffLoader } from 'react-spinners'

function ButtonLoader() {
  return (
    <div className='w-full flex justify-center'>
      <PuffLoader color={'white'} size={25} />
    </div>
  )
}

export default ButtonLoader
