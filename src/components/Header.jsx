import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineMenuBook } from "react-icons/md";
import { HiPlay } from "react-icons/hi2";

const Header = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);

    return (
        <header style={{ top: visible ? '0' : '-50px' }}>
            <div className='headerContainerDiv'>
                <div>
                    <Link to='/' style={{ color: '#000' }}><h2 className='Logo'>Quran Verse.</h2></Link>
                </div>
                <nav>
                    <NavLink to='/read/quran' className='forpcscreen' style={{ color: '#000' }}>Read quran</NavLink>
                    <NavLink to='/read/quran' className='forphonescreen'><MdOutlineMenuBook /> <span>Read</span></NavLink>

                    <NavLink to='/play/quran' className='forpcscreen' style={{ color: '#000' }}>Play quran</NavLink>
                    <NavLink to='/play/quran' className='forphonescreen'><HiPlay /> <span>Audio</span></NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
