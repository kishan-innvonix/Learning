import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container flex justify-center items-center h-lvh">
        <Link to="/register" className='border px-3 py-1 rounded bg-gray-50'>Register Here...</Link>
    </div>
  )
}

export default Home