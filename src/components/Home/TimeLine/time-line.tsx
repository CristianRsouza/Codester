import { useState } from 'react'
import CreatePost from './CreatePost/create-post'
import './time-line.css'

interface Message {
  id: number,
  writer: string,
  content: string,
  image: string | null
  writer_login: string,
  writer_avatar: string
}

const TimeLine = () => {
  
  const [Messages, setMessages] = useState<Message[]>([])
  
  console.log(Messages);
  
  
  return(
    <div className='TimeLine'>
        <CreatePost setMessages={setMessages} Messages={Messages}/>
          {Messages.map(message => 
            <div className='Message'>
              <div className='MessageHead'>
                  <img src={message.writer_avatar} width={60} alt="" />
                  <h3>{message.writer}</h3>
                  <p>@{message.writer_login}</p>
              </div>
              <p>{message.content}</p>
            </div>
            )
          }
    </div>
  )
}

export default TimeLine