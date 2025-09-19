import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {

    const cvURL = "https://drive.google.com/file/d/18v36b_DhKmd63tmZtNTGL2A4LUmh4fao/view?usp=drive_link"
    const [menuActive, setMenuActive] = useState(false);

    const Navigate = useNavigate();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setMenuActive(false);
    };

    const CheckMenuActive = () => {
        if (menuActive) {
            handleScrollToTop();
            toggleMenu();
        } else handleScrollToTop()
    }


    return (
        <nav className="navbar">
            <div className="logo" style={{ cursor: 'pointer' }} onClick={() => {
                window.scrollTo(0, 0);
                Navigate('/')
            }}>Balram Shukla</div>
            <div className="hamburger" onClick={toggleMenu}>
                <div className={`bar ${menuActive ? 'rotate' : ''}`}></div>
                <div className={`bar ${menuActive ? 'fade' : ''}`}></div>
                <div className={`bar ${menuActive ? 'rotate-reverse' : ''}`}></div>
            </div>
            <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
                <li><Link to="/" onClick={() => { CheckMenuActive() }}
                >Home</Link></li>
                <li><Link to="/skill" onClick={() => { CheckMenuActive() }}
                >Skills</Link></li>
                <li><Link to="/about" onClick={() => { CheckMenuActive() }}
                >About</Link></li>
                <li><Link to="/projects" onClick={() => { CheckMenuActive() }}>Projects</Link></li>
                <li><Link to="/certificate" onClick={() => { CheckMenuActive() }}
                >Certificates</Link></li>
                <li><a href={cvURL} target="_blank" rel="noopener noreferrer">Resume</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
