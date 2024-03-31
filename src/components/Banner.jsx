import { CiSearch } from 'react-icons/ci';
import {Link} from 'react-router-dom';
import arbicText2 from '../assets/arbicText2.png'
const Banner = ({searchQuery, handleSearch}) => {
  return (
    <>
      <div className='Banner' >
        <div className='center-div'>
          <div className='containen-div'>
            <div className='text-img-div'>
              <img  src={arbicText2} width='450' height='150' className='textImg' alt='textImg'></img>
            </div>
            <div className='search-form'>
              <input type="search" value={searchQuery} onChange={handleSearch} placeholder="Search word or ayat in Quran" className="search-input" />
              <button><CiSearch /></button>
            </div>
            <div className='BannerBtns'>
              <Link to='/Yaseen'><button>Ya-sin</button></Link>
              <Link to='/Ayatul-Kursi'><button>Ayatul Kursi</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner