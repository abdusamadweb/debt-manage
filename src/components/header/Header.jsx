import './Header.scss'
import React, {useState} from 'react';
import NavBar from "./NavBar";
import {Link, useLocation} from "react-router-dom";

const Header = () => {

    const location = useLocation()

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className={`header ${openMenu ? 'open' : ''} ${location.pathname === '/sign-in' ? 'd-none' : ''}`}>
            <div className="container">
                <div className="header__inner">
                    <Link to='/'>
                        <h1 className={`header__logo ${openMenu ? 'open opa' : ''}`}>DEBT-M</h1>
                    </Link>
                    <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
                    <div className='burger-menu'>
                        <button onClick={() => setOpenMenu(true)}>
                            <i className={`fa-solid fa-bars-staggered icon ${openMenu ? 'close' : 'open'}`}/>
                        </button>
                        <button onClick={() => setOpenMenu(false)}>
                            <i className={`fa-solid fa-xmark icon ${openMenu ? 'open left' : 'close'}`}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;