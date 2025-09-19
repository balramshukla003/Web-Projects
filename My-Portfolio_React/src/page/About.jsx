import { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaCode, FaReact, FaNodeJs, FaLaptopCode } from 'react-icons/fa';
import { LuDatabase } from "react-icons/lu";
import { SiMongodb } from 'react-icons/si';
import photo from '../images/img Balram .jpg'
import Links from '../api/Social-Links.json'

export default function About() {
    useEffect(() => {
        document.title = "Balram Shukla | About";
    }, []);

    return (
        <div className="about-container">
            <section className="hero-section">
                <div className="content-wrapper">
                    <div className="text-content">
                        <h1 className="gradient-heading">Crafting Digital Experiences</h1>
                        <p className="subtitle">Full-Stack Developer & Problem Solver</p>
                        <p className="description">
                            I'm a passionate developer eager to create immersive user experiences. I focus on bridging the gap between UI/UX and technology, striving to deliver applications that are both functional and visually appealing.
                        </p>
                        <div className="social-links">
                            <a href={Links.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="social-icon" />
                            </a>
                            <a href={Links.linkedin} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="social-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="image-content">
                        <div className="profile-image"><img src={photo} alt="" style={{ borderRadius: "20px" }} /></div>
                        <div className="decorative-box"></div>
                    </div>
                </div>
            </section>

            <section className="skills-section">
                <h2 className="section-title">Technical Arsenal</h2>
                <div className="skills-grid">
                    <div className="skill-card">
                        <FaReact className="skill-icon" />
                        <h3>Frontend</h3>
                        <p>Html, Css, JSX, React, Flutter</p>
                    </div>
                    <div className="skill-card">
                        <FaNodeJs className="skill-icon" />
                        <h3>Backend</h3>
                        <p>Node.js, Express.js, REST APIs, PHP, dotnet</p>
                    </div>
                    <div className="skill-card">
                        <LuDatabase className="skill-icon" />
                        <h3>Databases</h3>
                        <p>MongoDB, MySQL, SQL Server</p>
                    </div>
                    <div className="skill-card">
                        <FaCode className="skill-icon" />
                        <h3>Tools</h3>
                        <p>VS Code, Visual Studio, IntelliJ Idea, ChromeDev Tool, WinMerge, Libree Office</p>
                    </div>
                    <div className="skill-card">
                        <FaLaptopCode className="skill-icon" />
                        <h3>Languages</h3>
                        <p>Java, JavaScript, C++, Python, CSharp</p>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .about-container {
          background-color: #232946;
          color: #fffffe;
          min-height: 100vh;
          padding: 2rem 5%;
          font-family: 'Poppins', sans-serif;
        }

        .hero-section {
          padding: 0;
          margin-top: 0px;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 20% auto;
          display: flex;
          gap: 4rem;
          align-items: center;
        }

        .text-content {
          flex: 1;
          animation: slideUp 1s ease;
        }

        .gradient-heading {
          font-size: 3rem;
          background: linear-gradient(45deg, #eebbc3, #b8c1ec);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .subtitle {
          color: #b8c1ec;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .description {
          color: #232537;
          line-height: 1.8;
          margin-bottom: 2rem;
          max-width: 600px;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          font-size: 1.8rem;
          color:rgb(28, 57, 96);
          transition: transform 0.3s ease;
        }

        .social-icon:hover {
          color:rgb(69, 7, 16);
          transform: translateY(-3px);
        }

        .image-content {
          position: relative;
          flex: 1;
        }

        .profile-image {
          width: 350px;
          height: 450px;
          border-radius: 20px;
          position: relative;
          z-index: 2;
        }

        .decorative-box {
          position: absolute;
          width: 350px;
          height: 450px;
          border: 3px solid #eebbc3;
          border-radius: 20px;
          top: 20px;
          left: 20px;
          z-index: 1;
        }

        .skills-section {
          margin-top: 6rem;
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          width: 80px;
          height: 3px;
          background: #eebbc3;
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .skill-card {
          background: #121629;
          padding: 2rem;
          border-radius: 15px;
          transition: transform 0.3s ease;
          text-align: center;
        }

        .skill-card:hover {
          transform: translateY(-10px);
        }

        .skill-icon {
          font-size: 2.5rem;
          color: #eebbc3;
          margin-bottom: 1rem;
        }

        .skill-card h3 {
          color: #fffffe;
          margin-bottom: 1rem;
        }

        .skill-card p {
          color: #a7a9be;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        @keyframes slideUp {
          from {
              opacity: 0;
              transform: translateY(50px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
        }

        @media (max-width: 768px) {

          .hero-section {
              padding:  4rem 0;
           }

          .content-wrapper {
              margin-top: 10%;
              flex-direction: column;
              text-align: center;
          }

          .gradient-heading {
              font-size: 2.5rem;
          }

          .social-links {
              justify-content: center;
          }

          .image-content {
              margin-top: 2rem;
          }

          .profile-image, .decorative-box {
              width: 280px;
              height: 360px;
          }
          .description, .social-icon{
              color : white;
          }
              
        }
      `}</style>
        </div>
    );
}