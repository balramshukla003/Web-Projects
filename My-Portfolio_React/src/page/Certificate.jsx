import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';


import AIHp from "../images/AI Hp.png";
import tcs from "../images/tcsIon.png";
import SEInfys from "../images/SE infys.png";
import JavaBasic from "../images/Java basic.png";
import GoogleApplied from "../images/Google Aplied.png";
import CodeSoft from "../images/codesoft.png";
import ResumeHP from "../images/Email Hp.png";
import JavaScriptHackerRank from "../images/JavaScript HackerRank.png";
import PresentationInfys from "../images/Presentation infys.png";
import AWSForage from "../images/AWS Forage.png";
import CSSHackerRank from "../images/CSS HackerRank.png";
import TimeInfys from "../images/Time infys.png";
import LeadershipHP from "../images/Leadership Hp.png";
import NoSQLInfys from "../images/NoSQL infys.png";
import AccentureForage from "../images/AccentureUk Forage.png";
import EmailInfys from "../images/Email infys.png";
import SEInternHackerRank from "../images/SE Intern HackerRank.png";
import SeInfys from "../images/SE infys.png";

export default function Certificates() {

  const certificate = [
    {
      title: "Career Edge - IT for Non-IT",
      issuer: "TCS iON",
      date: "15 Jan 2025",
      link: "https://drive.google.com/file/d/1rt5FleSpSSiMq-Ygai0XWzSZVAml-wsr/view?usp=sharing",
      image: tcs,
    },
    {
      title: "AI for Beginners",
      issuer: "HP Foundation",
      date: "01 Jan 2025",
      link: "https://www.life-global.org/certificate/1f417f12-0930-40d7-a4f4-d58b63a81f6a",
      image: AIHp,
    },
    {
      title: "Software Engineering and Agile Software Development",
      issuer: "Infosys Springboard",
      date: "01 Aug 2024",
      link: "https://drive.google.com/file/d/1iaf4TirL-PsGA5HVnf4onU5ZnEUMtfLn/view?usp=sharing",
      image: SEInfys,
    },
    {
      title: "Software Engineering Job Simulation",
      issuer: "Forage",
      date: "13 Aug 2024",
      link: "https://drive.google.com/file/d/1FBb8A88iIAGA6VARFH0ECmgAJYfHVUa9/view?usp=sharing",
      image: SeInfys
    },
    {
      title: "Java (Basic)",
      issuer: "HackerRank",
      date: "16 Aug 2024",
      link: "https://www.hackerrank.com/certificate/7537c56733c0",
      image: JavaBasic,
    },
    {
      title: "Applied Skill",
      issuer: "Google",
      date: "01 Sep 2024",
      link: "https://drive.google.com/file/d/1kEdkD2dni8Iy0NIiekO5nIvBAhUWa1w5/view?usp=sharing",
      image: GoogleApplied,
    },
    {
      title: "Web Development Virtual Intern",
      issuer: "CodeSoft",
      date: "23 July 2024",
      link: "https://drive.google.com/file/d/1LwZMpG0a9hYBocHquyZUu6mcolLdteI9/view?usp=sharing",
      image: CodeSoft,
    },
    {
      title: "Resume Writing and Job Interviewing",
      issuer: "HP Foundation",
      date: "01 Feb 2025",
      link: "https://www.life-global.org/certificate/2fc80309-9901-438e-8846-066857d5241d",
      image: ResumeHP,
    },
    {
      title: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "3 Dec 2024",
      link: "https://www.hackerrank.com/certificate/a801a87ad059",
      image: JavaScriptHackerRank,
    },
    {
      title: "High Impact Presentation",
      issuer: "Infosys Springboard",
      date: "04 Aug 2024",
      link: "https://drive.google.com/file/d/1nDgFPx7crHV23XH_45IcC16BiInz6Tmi/view?usp=sharing",
      image: PresentationInfys,
    },
    {
      title: "Solutions Architecture Job Simulation",
      issuer: "Forage",
      date: "16 Aug 2024",
      link: "https://drive.google.com/file/d/1aYl6YvK5GSDeYl_WMrp6orV5mABj8V3f/view?usp=sharing",
      image: AWSForage,
    },
    {
      title: "CSS (Basic)",
      issuer: "HackerRank",
      date: "3 Dec 2024",
      link: "https://www.hackerrank.com/certificate/9ca00cd992bf",
      image: CSSHackerRank,
    },
    {
      title: "Time Management",
      issuer: "Infosys Springboard",
      date: "04 Aug 2024",
      link: "https://drive.google.com/file/d/1r_A2KViyIHm_EBKsJAJD95iHGyigHugs/view?usp=sharing",
      image: TimeInfys,
    },
    {
      title: "Effective Leadership",
      issuer: "HP Foundation",
      date: "01 Feb 2025",
      link: "https://www.life-global.org/certificate/154fddd4-def7-4341-a507-694f416616a3",
      image: LeadershipHP,
    },
    {
      title: "Introduction to NoSQL Databases",
      issuer: "Infosys Springboard",
      date: "01 Aug 2024",
      link: "https://drive.google.com/file/d/1kom1QmS1p14Pz8Z-aM3S3NwbFG7JNypU/view?usp=sharing",
      image: NoSQLInfys,
    },
    {
      title: "Developer and Technology Job Simulation",
      issuer: "Forage",
      date: "28 July 2024",
      link: "https://drive.google.com/file/d/11FAyNCNZxT-ROsiRWn4-nFtxOI-zuFhR/view?usp=sharing",
      image: AccentureForage,
    },
    {
      title: "Email Writing",
      issuer: "Infosys Springboard",
      date: "04 Aug 2024",
      link: "https://drive.google.com/file/d/1f3W1OK4G9xygV8EjrzMAxj-gLMSB43Xt/view?usp=sharing",
      image: EmailInfys,
    },
    {
      title: "Software Engineer Intern",
      issuer: "HackerRank",
      date: "03 Sep 2024",
      link: "https://www.hackerrank.com/certificate/07bb32f4e032",
      image: SEInternHackerRank,
    },
  ];

  useEffect(() => {
    document.title = "Balram Shukla | Certficates";
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <div className="certificate-container">
      <section className="cetificate-hero">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="gradient-heading"
        >
          Accreditations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="subtitle"
        >
          Validating knowledge, demonstrating expertise
        </motion.p>
      </section>

      <motion.div
        ref={ref}
        className="certificate-grid"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {certificate.map((cert, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="certificate-card"
          >
            <div className="certificate-image">
              <img src={cert.image} alt={cert.title} style={{ cursor: "pointer" }} onClick={() => {
                window.open(cert.link, "_blank");
              }} />
            </div>

            <div className="certificate-details">
              <FaCertificate className="cert-icon" />
              <h3>{cert.title}</h3>
              <div className="meta-info">
                <span className="issuer">{cert.issuer}</span>
                <span className="date">{cert.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        .certificate-container {
          background: #232946;
          color: #fffffe;
          min-height: 100vh;
          padding: 4rem 5%;
          font-family: 'Poppins', sans-serif;
        }

        .cetificate-hero {
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

        .certificate-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .certificate-card {
          background: #121629;
          border-radius: 15px;
          overflow: hidden;
          position: relative;
        }

        .certificate-image {
          height: 250px;
          position: relative;
          overflow: hidden;
        }

        .certificate-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        

        .certificate-card:hover img {
          transform: scale(1.05);
        }

        .view-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: #eebbc3;
          color: #232946;
          border-radius: 30px;
          font-weight: 600;
          transition: transform 0.3s ease;
        }

        .view-button:hover {
          transform: translateY(-3px);
        }

        .certificate-details {
          padding: 1.5rem;
          position: relative;
        }

        .cert-icon {
          position: absolute;
          top: -1.5rem;
          right: 1.5rem;
          font-size: 2.5rem;
          color: rgba(238, 187, 195, 0.1);
        }

        .certificate-details h3 {
          color: #fffffe;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .meta-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .issuer {
          color: #b8c1ec;
        }

        .date {
          color: #a7a9be;
        }

        @media (max-width: 768px) {
          .gradient-heading {
            font-size: 2.5rem;
          }

          .certificate-grid {
            grid-template-columns: 1fr;
          }

          .certificate-image {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}