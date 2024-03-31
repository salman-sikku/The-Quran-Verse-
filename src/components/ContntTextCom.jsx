import { useState } from "react";

const ContntTextCom = ({ id, text, translation }) => {
  const [TransTextShow, setTransTextShow] = useState(false)
  return (
    <>
      <div className='contentContainer' key={id}>
        <div className='contentHeader'>
          {TransTextShow ? <button onClick={() => setTransTextShow(false)}>Translation Hide</button> : <button onClick={() => setTransTextShow(true)}>Translation Show</button>}
          <div >
            <p>Ayat no :</p>
            <span>{id}</span>
          </div>
        </div>
        <div className='ayahTextDiv'>
          <p className='ayahText'>{text}</p>
        </div>
        <div className='TranslationText'>
          {TransTextShow && <p>{translation}</p>}
        </div>
      </div>
    </>
  )
}

export default ContntTextCom