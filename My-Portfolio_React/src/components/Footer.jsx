import '../css/Footer.css'
import socialLinks from '../api/Social-Links';
import { Link } from 'react-router-dom';
import Icons from './Icons.jsx';

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-links">
                    <h2>Important Links</h2>
                    <ul>
                        <li><Link to="/" onClick={() => handleScrollToTop()}>Home</Link></li>
                        <li><Link to="/about" onClick={() => handleScrollToTop()}>About</Link></li>
                        <li><a href='https://drive.google.com/file/d/1BXWhuhYjth-3-OsaklS8I5uUuiWs6uEJ/view?usp=sharing' onClick={() => handleScrollToTop()}>Resume</a></li>
                        <li><Link to="/projects" onClick={() => handleScrollToTop()}>Projects</Link></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h2>Follow me on</h2>
                    <div className="social-icons">
                        <Link to={socialLinks.facebook} className="social-icon-facebook"><Icons.Facebook /></Link>
                        <Link to={socialLinks.twitter} className="social-icon-twitter"><Icons.Twitter /></Link>
                        <Link to={socialLinks.instagram} className="social-icon-instagram"><Icons.Instagram /></Link>
                        <Link to={socialLinks.github} className="social-icon-github"><Icons.Github /></Link>
                        <Link to={socialLinks.linkedin} className="social-icon-linkedin"><Icons.Linkedin /></Link>
                        <Link to={socialLinks.telegram} className="social-icon-telegram"><Icons.Telegram /></Link>
                        <Link to={socialLinks.whatsapp} className="social-icon-whatsapp"><Icons.Whatsapp /></Link>
                    </div>
                </div>

                <div className="footer-contact">
                    <h2>Contact me</h2>
                    <p>Phone: +91 9026050563</p>
                    <a className='mailB' href="mailto:balramshukla003@gmail.com">Email: balramshukla003@gmail.com</a>
                    <a className='mailA' href="mailto:balramshukla003@gmail.com">Email</a>
                </div>
            </div >
        </footer >
    );
};

export default Footer;