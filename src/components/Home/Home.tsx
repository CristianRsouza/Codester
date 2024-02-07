import './Home.css'
import SideBar from './SideBar/SideBar'
import ThrendBar from './ThrendBar/thrend-bar'
import TimeLine from './TimeLine/time-line'

const Home = () => {
  return(
    <div className='Main'>
        <SideBar/>
        <hr />
        <TimeLine/>
        <hr />
        <ThrendBar/>
    </div>
  )
}

export default Home