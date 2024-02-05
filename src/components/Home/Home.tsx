import './Home.css'
import SideBar from './SideBar/SideBar'
import TimeLine from './TimeLine/time-line'

const Home = () => {
  return(
    <div className='Main'>
        <SideBar/>
        <hr />
        <TimeLine/>
    </div>
  )
}

export default Home