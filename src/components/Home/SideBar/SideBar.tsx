import { useContext } from 'react';
import './SideBar.css'
import { Context } from '../../../App';

const SideBar = () => {
  
  const { myUser } = useContext(Context);
  
  console.log(myUser);
  
  
  return(
    <div className='SideBar'>
        <ul>
          <li>
            <button>Home</button>
          </li>
          <li>
            <button>Explore</button>
          </li>
          <li>
            <button>Profile</button>
          </li>
        </ul>

        <div className='myUser'>
          <img src={myUser.avatar} width={50} alt="" />
            <div className='MyUserNames'>
              <h4>{myUser.name}</h4>
              <p>@{myUser.login}</p>
            </div>
        </div>
    </div>
  )
}

export default SideBar