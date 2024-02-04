import { useContext } from 'react'
import './Login.css'
import { Context } from '../../App'

const Login = () => {
  
  const {auth, setAuth, myUser, setMyUser} = useContext(Context)





  console.log(auth);
  
  return(
    <div className='Login'>

      <button>Login with GitHub</button>
    </div>
  )
}

export default Login