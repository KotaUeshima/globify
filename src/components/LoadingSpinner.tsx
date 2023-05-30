function Spinner() {
  return (
    <div className='flex items-center justify-center rounded-full h-6 w-6 bg-gradient-to-tr from-gray-50 to-gray-400 animate-spin'>
      <div className='h-4 w-4 rounded-full bg-primary'></div>
    </div>
  )
}

export default Spinner
