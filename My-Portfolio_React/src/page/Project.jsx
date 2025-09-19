import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useEffect } from 'react';

import Links from "../api/Social-Links.json"

import ProjectChat from "../images/Chatapplication.png"
import Project1 from "../images/MarketPlace.png"
import Project2 from "../images/Screenshot 2025-01-05 134854.png"
import Project3 from "../images/Portfolio.png"
import Project4 from "../images/Screenshot 2025-01-05 135837.png"
import Project5 from "../images/Screenshot 2025-01-05 141626.png"

export default function ProjectsPage() {

  useEffect(() => {
    document.title = "Balram Shukla | Projects";
  }, []);
  
  const projects = [
    {
      title: "Chat Apllication",
      description: "Provide facility to chat with other user in real time, also can check the active user's using socket.io.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "MySQL"],
      link: "",
      github: Links.chatapplication.github,
      image: ProjectChat
    },
    {
      title: "Market Place",
      description: "Solving the problem of Finding jobs and Hiring candidate, connects companies & job seekers",
      tags: ["React", "JSX", "CSS", "Node.js", "Express", "MongoDB"],
      link: "https://marketplaceplatform.netlify.app/",
      github: Links.marketplace.github,
      image: Project1
    },
    {
      title: "My Portfolio",
      description: "A fully modern designed portfolio for showing my learning, skill, development, projects & many more.",
      tags: ["React", "JSX", "CSS", "API"],
      link: "https://balramshukla.netlify.app/",
      github: "https://github.com/balramshukla003/My-Portfolio_React",
      image: Project3
    },
    {
      title: "Inno-Tech",
      description: "E-learning platform for both students and teachers, providing seamless and enjoyable user experience.",
      tags: ["Html", "CSS", "Node.js", "Express.js", "MySQL"],
      link: "https://github.com/balramshukla003/Quiz_App-InnoTech",
      github: "https://github.com/balramshukla003/Quiz_App-InnoTech",
      image: Project2
    },
    {
      title: "Resturant Mangement System",
      description: "The Restaurant Website project aims to create an engaging and user-friendly platform for a fine dining restaurant. ",
      tags: ["Html", "CSS", "JavaScript", "MySQL"],
      link: "https://github.com/balramshukla003/Resturant-Website",
      github: "https://github.com/balramshukla003/Resturant-Website",
      image: Project4
    },
    {
      title: "Student Database Management",
      description: "A Student Database Managemnt System for schools and colleges for registration activity of student.",
      tags: ["Java", "AWT", "Swing", "JDBC", "JDBC Drivers", "MySQL"],
      link: "https://www.linkedin.com/posts/balram-shukla-3189b6269_educationtechnology-schoolmanagement-studentrecords-activity-7176246651689349120-enKu?utm_source=share&utm_medium=member_desktop",
      github: "https://github.com/balramshukla003/JAVA-DBMS-project",
      image: Project5
    },
  ];

  return (
    <div className="projects-container">
      <section className="projects-hero">
        <h1 className="gradient-heading">My Creations</h1>
        <p className="subtitle">Exploring the intersection of design and technology</p>
      </section>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="icon" />
                </a>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="icon" />
                </a>
              </div>
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="description">{project.description}</p>

              <div className="tech-stack">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tech-tag">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .projects-container {
          background: #232946;
          color: #fffffe;
          min-height: 100vh;
          padding: 4rem 5%;
          font-family: 'Poppins', sans-serif;
        }

        .projects-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .gradient-heading {
          font-size: 3.5rem;
          background: linear-gradient(45deg, #eebbc3, #b8c1ec);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .subtitle {
          color: #b8c1ec;
          font-size: 1.2rem;
          font-weight: 400;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .project-card {
          background: #121629;
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
        }

        .project-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
          max-width:auto;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-links {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 1rem;
        }

        .icon {
          font-size: 1.5rem;
          color: #fffffe;
          background: rgba(36, 41, 67, 0.8);
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .icon:hover {
          color: #eebbc3;
          transform: scale(1.1);
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-content h3 {
          display: flex;
          align-items: center;
          gap:10px;
          color: #fffffe;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .description {
          color: #a7a9be;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          background: rgba(184, 193, 236, 0.1);
          color: #b8c1ec;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .gradient-heading {
            font-size: 2.5rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-image {
            height: 200px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-card {
          animation: fadeIn 0.5s ease forwards;
          animation-delay: calc(0.1s * var(--i));
        }
      `}</style>
    </div>
  );
}