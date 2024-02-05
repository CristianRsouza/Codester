import React, { useState } from 'react';
import { useContext } from 'react';
import './create-post.css';
import { Context } from '../../../../App';
import { Image } from 'lucide-react';

interface Message {
  id: number,
  writer: string,
  content: string,
  image: string | null
  writer_login: string,
  writer_avatar: string
}

interface Props {
  Messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const CreatePost: React.FC<Props> = ({ Messages, setMessages }) => {
  const { myUser } = useContext(Context);
  const [inputContent, setInputContent] = useState<string>('');
  const [inputFile, setInputFile] = useState<string>('');

  const handleMessageAddition = () => {
    const newMessage: Message = {
      id: Math.floor(Math.random() * 100),
      writer: myUser.name,
      content: inputContent,
      image: inputFile,
      writer_avatar: myUser.avatar,
      writer_login: myUser.login
    };

    setMessages([...Messages, newMessage]); 

    setInputContent('');
    setInputFile('');
  };

  return (
    <div className="CreatePost">
      <div className="CreatePostContent">
        <img src={myUser.avatar} width={60} alt="" />
        <input
          type="text"
          placeholder="Qual é a boa?"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
      </div>
      <div className="CreatePostConfig">
        <div className="InputFile">
          <div className="InputFileIcon">
            <Image color="rgb(25, 67, 255)" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInputFile(e.target.value)} // handle file input change
          />
        </div>
        <button onClick={handleMessageAddition}>Postar</button>
      </div>
    </div>
  );
};

export default CreatePost;