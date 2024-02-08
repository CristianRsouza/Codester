import { useContext, useEffect, useState } from 'react'
import './InputSearch.css'
import { Context } from '../../../../App'

const InputSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const { Messages } = useContext(Context)
  const [messageFound, setMessageFound] = useState<string>('')

  useEffect(() => {
    const foundMessage = Messages.find((message: { content: string }) => message.content === searchValue);
    setMessageFound(foundMessage ? foundMessage.content : ''); // Define o conteúdo da mensagem encontrada
  }, [searchValue, Messages])

  return(
    <div className='InputSearch'>
      <input placeholder='Buscar' type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <div className={messageFound !== '' ? "SearchModal" : "InvisibleSearchModal"}>
        <p>Procurar por {searchValue}</p>
      </div>  
    </div>
  )
}

export default InputSearch
