import React from 'react';
import { useRread } from '../context/AddtoRecentSura';
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function RecentReadSura() {
  const { sura, removeFromSuraRread } = useRread();

  const handleRemove = (index) => {
    removeFromSuraRread(index)
  }
  return (
    <>
      {
        sura.length === 0 ? '' : (<div className='recentReadContainer'>
          <h3>Recently Read</h3>
          <div className='cateHorzantle'>
            {
              sura.map((curElm, index) => (
                <div key={index} className='recentReadBox'>
                  <div className='recentRead_contain'>
                    <div className='recentRead_top_div'>
                      <span>{curElm.translation}</span>
                      <span onClick={() => handleRemove(index)}><IoCloseSharp /></span>
                    </div>
                    <Link to={`/sura/detail/${curElm.id}`} className='recentLink'>{curElm.transliteration}</Link>
                    <div className='recentRead_name_box'>
                      <h2>{curElm.name}</h2>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>)
      }
    </>
  )
}

export default RecentReadSura
