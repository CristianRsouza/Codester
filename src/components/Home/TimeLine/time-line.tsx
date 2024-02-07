import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext, useState } from 'react'; // Importing necessary modules from React
import CreatePost from './CreatePost/create-post'; 
import './time-line.css'; 
import { Context } from '../../../App';

const TimeLine = () => {
  

  const { Messages, setMessages } = useContext(Context);

  console.log(Messages); 
  
  return (
    <div className='TimeLine'>
    <CreatePost/>
      {Messages.map((message: { writer_avatar: string | undefined; writer: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; writer_login: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; image: { toString: string | undefined; }; }) => 
        <div className='Message'>
          <div className='MessageHead'>
              <img src={message.writer_avatar} width={60} alt="" />
              <h3>{message.writer}</h3>
              <p>@{message.writer_login}</p>
          </div>
          <div className='MessageContent'>
            <p>{message.content}</p>
            { <img src={message.image.toString()} alt="" />}



          </div>
        </div>
        )
      }
</div>
  );
};

export default TimeLine; 
