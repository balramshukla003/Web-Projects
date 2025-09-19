import React, { useEffect } from 'react';
import '../css/Landing.css';
import { Link } from 'react-router-dom';
import Avtar from '../images/avatar.jpg'


const Landing = () => {
  
    useEffect(() => {
        document.title = "Balram Shukla | Home";
        const hash = window.location.hash;
        if (hash) {
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <div className="landing-page">

            <header className="hero-section">
                <div className="hero-image">
                    <img src={Avtar} alt="Professional Work" />
                </div>
                <div className="content">
                    <h1>Welcome to My Portfolio</h1>
                    <p>
                        Hi, I'm a passionate <span>Software Developer</span> and <span>Web Designer</span>,
                        crafting visually stunning and user-friendly applications.
                    </p>
                    <Link to="/projects" style={{ textDecoration: "none" }} className="cta-button">View My Work</Link>
                </div>
            </header>

            {/* <main className="main">
                About Me
                I’m Balram Shukla, a passionate fresher skilled in Full-Stack and Software Development. With expertise in modern tools like HTML, CSS, JavaScript, React.js, Node.js, and MySQL, I focus on creating user-friendly web applications and scalable software solutions.

                I combine a keen eye for design with strong problem-solving skills to build intuitive interfaces and robust back-end systems. My goal is to deliver clean, efficient, and impactful solutions while continuously learning and growing as a developer.

                Skills:
                ✔️Web Designing
                ✔️Full-Stack Development
                ✔️Problem Solving and Debugging

                I'm excited about collaborating on innovative projects and contributing to impactful solutions that make a difference. Let's create something amazing together!

                Know more
            </main> */}

        </div >
    );
};

export default Landing;