import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch } from 'react'

function DeleteModal({
  setOpenDeleteModal,
  deleteSong,
}: {
  setOpenDeleteModal: Dispatch<[boolean, number]>
  deleteSong: () => void
}) {
  return (
    <div className='z-40 h-full w-screen fixed inset-0 modalBackground flex justify-center items-center'>
      <div className='h-[200px] w-[300px] flex flex-col bg-secondary px-4 pb-4 globalRounded'>
        <div className='h-10 py-2 flex justify-end items-center'>
          <XMarkIcon
            onClick={() => setOpenDeleteModal([false, -1])}
            className='basicIconSize rounded-full hover:bg-primary hover:text-secondary globalTransition cursor-pointer'
          />
        </div>
        <h2 className='text-xl font-medium'>
          Are you sure you want to delete this song?
        </h2>
        <div className='mt-6 w-3/4 mx-auto flex flex-row justify-between text-secondary'>
          <button
            onClick={deleteSong}
            className='py-3 px-6 bg-tertiary globalRounded'
          >
            Yes
          </button>
          <button
            onClick={() => {
              setOpenDeleteModal([false, -1])
            }}
            className='py-3 px-6 bg-primary globalRounded'
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
