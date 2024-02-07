import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext, useEffect } from 'react';
import CreatePost from './CreatePost/create-post'; 
import './time-line.css'; 
import { Context } from '../../../App';
import { io } from 'socket.io-client';

const TimeLine = () => {
  const { Messages, setMessages } = useContext(Context);
  
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("newPost", (newPost) => {
      setMessages(newPost); // Atualiza as mensagens com as novas mensagens recebidas do servidor
    });

    return () => {
      socket.disconnect(); // Desconecta o socket quando o componente é desmontado
    };
  }, [setMessages]);

  return (
    <div className='TimeLine'>
      <CreatePost/>
      {Messages.map((message: { id: Key | null | undefined; writer_avatar: string | undefined; writer: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; writer_login: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; image: { toString: () => string | undefined; }; }) => 
        <div className='Message' key={message.id}>
          <div className='MessageUserImage'>
            <img src={message.writer_avatar} width={60} alt="" />
          </div>
          <div className='MessageContent'>
            <div className='MessageHead'>
              <h3>{message.writer}</h3>
              <p>@{message.writer_login}</p>
              <p>{message.date}</p>
            </div>
            <p>{message.content}</p>
            {message.image && <img src={message.image.toString()} alt="" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeLine;
