import React, { useState } from 'react';
import { useContext } from 'react';
import './create-post.css';
import { Context } from '../../../../App';
import { Divide, Image } from 'lucide-react';




const CreatePost = () => {
  const { myUser } = useContext(Context);
  const [inputContent, setInputContent] = useState<string>('');
  const [inputFile, setInputFile] = useState<string | null>(null);
  const { Messages, setMessages } = useContext(Context);



  const handleMessageAddition = () => {
    const newMessage = {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setInputFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="CreatePost">
      <div className="CreatePostContent">
      <img src={myUser.avatar} className='myUserPost' width={60} alt="" />
            <div className='PostContainer'>
                <input
                type="text"
                placeholder="Qual é a boa?"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
              />
                   {inputFile && <div className='ImageContainer'>
                                    <img src={inputFile} className='Image'  alt="" />
                                    <p onClick={() => {
                                      setInputFile(null)
                                    }}>x</p>
                                  </div>}
                  
            </div>

      </div>
      <div className="CreatePostConfig">
        <div className="InputFile">
          <div className="InputFileIcon">
            <Image color="rgb(36, 36, 36)" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Manipule o arquivo aqui
          />
        </div>
        <button onClick={handleMessageAddition}>Postar</button>
      </div>
    </div>
  );
};

export default CreatePost;
