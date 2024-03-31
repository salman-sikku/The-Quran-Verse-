import React from 'react';
import {Link} from 'react-router-dom';
import {useRread} from '../context/AddtoRecentSura';

function Sura({ data }) {
    const { addToSuraRread } = useRread();
    const handleReadsave = (oje)=>{
      addToSuraRread(oje)
    }
    return (
        <>
            <div className="sura-body">
                {data.map((item) => <Link onClick={()=> handleReadsave(item)} to={`/sura/detail/${item.id}`} key={item.id}>
                    <div key={item.id} className="sura-name">
                        <div className="sura-titale-with-id">
                            <p className="sura-id">{item.id}</p>
                            <div className="sura-titale">
                                <h3>{item.transliteration}</h3>
                                <p>{item.translation}</p>
                            </div>
                        </div>
                        <div className="sura-titale-with-name">
                            <h3>{item.name}</h3>
                            <p>{item.total_verses} Ayahs</p>
                        </div>
                    </div>
                </Link>)}
            </div>
        </>
    )
}

export default Sura
