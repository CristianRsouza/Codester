import React, { useContext, useEffect } from 'react';
import './Login.css';
import { Context } from '../../App';
import queryString from 'query-string';
import axios from 'axios';
import { io } from 'socket.io-client';

const Login = () => {
    const { auth, setAuth, setMyUser } = useContext(Context);
    const socket = io("http://localhost:5000")




    useEffect(() => {
        const fetchData = async () => {
            const { code } = queryString.parseUrl(window.location.href).query;

            if (code) {
                try {
                    const response = await axios.post('http://localhost:5000/login', { code });
                    const data = await response.data;
                    console.log(data);
                    setAuth(true)
                    socket.emit("connection")
                    setMyUser({
                        avatar: data.avatar_url,
                        name: data.name,
                        id: data.id,
                        login: data.login
                    })
                } catch (error) {
                    console.error('Erro ao fazer a requisição para o servidor:', error);
                }
            }
        };

        fetchData();
    }, []);

    

    const redirectToGithub = () => {
      const GITHUB_URL = "https://github.com/login/oauth/authorize";
      const params = {
          response_type: "code",
          scope: "user",
          client_id: "98347812d33e772baf1e",
          redirect_uri: "http://localhost:5173"
      };
      const queryStringParams = queryString.stringify(params);
      const authURL = `${GITHUB_URL}?${queryStringParams}`;
      window.location.href = authURL;
  };
  


    return (
        <div className='Login'>
            <div className='LoginContainer'>
                <div>  
                    <h1>CODESTER</h1>
                    <p>The best social media for devs</p>
                </div>
                    <button onClick={redirectToGithub}>Login with GitHub</button>
                </div>
        </div>
    );
}

export default Login;