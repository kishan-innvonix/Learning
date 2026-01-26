import { Loader } from 'lucide-react'

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader className='animate-spin' /> 
        <p className='text-gray-700 font-semibold animate-pulse'>{message}</p>
      </div>
    </div>
  )
}

export default Loading
