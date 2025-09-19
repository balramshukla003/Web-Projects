import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const certificates = [
  {
    title: "Advanced React Development",
    issuer: "Meta",
    date: "2024",
    link: "#",
    image: "/cert1.jpg"
  },
  {
    title: "Cloud Architecture",
    issuer: "AWS",
    date: "2023",
    link: "#",
    image: "/cert2.jpg"
  },
  {
    title: "UX Design Professional",
    issuer: "Google",
    date: "2023",
    link: "#",
    image: "/cert3.jpg"
  },
];

export default function CertificatesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <div className="certificates-container">
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
        className="certificates-grid"
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
        {certificates.map((cert, index) => (
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
              <img src={cert.image} alt={cert.title} />
              <div className="certificate-overlay">
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-button"
                >
                  <FaExternalLinkAlt />
                  Verify
                </a>
              </div>
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
        .certificates-container {
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

        .certificates-grid {
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

        .certificate-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(18, 22, 41, 0.8);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .certificate-card:hover .certificate-overlay {
          opacity: 1;
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

          .certificates-grid {
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