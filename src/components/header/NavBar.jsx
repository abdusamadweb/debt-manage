import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = ({ openMenu, setOpenMenu }) => {

    const navbar = [
        {
          name: 'Dashboard',
          link: '/'
        },
        {
            name: 'Qarzdorlar',
            link: '/qarzdorlar'
        },
        {
            name: 'Profile',
            link: '/profile'
        },
        {
            name: 'Xabar',
            link: '/xabar'
        },
    ]

    return (
        <nav className={`nav ${openMenu ? 'open' : ''}`}>
            <ul className="nav__list">
                {
                    navbar.map((item, i) => (
                        <li className="nav__item" onClick={() => setOpenMenu(false)} key={i}>
                            <NavLink className='nav__link row between align-center' to={item.link}>
                                <span>{ item.name }</span>
                                <i className="fa-solid fa-chevron-right icon"/>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default NavBar;
