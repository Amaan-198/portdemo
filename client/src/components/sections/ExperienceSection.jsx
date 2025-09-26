import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import he from 'he';
import { getExperiences } from '../../api/apiService';
import useFetchData from '../../hooks/useFetchData';
import './ExperienceSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ExperienceSection = () => {
  const { data: experiences, loading, error } = useFetchData(getExperiences);

  return (
    <div id="experience" className="experience-section">
      <Container>
        <h2 className="display-5 fw-bold text-center text-white mb-5">Professional Experience</h2>

        {loading ? (
          <p className="text-center text-white">Loading experience...</p>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <motion.div
            className="experience-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp) => (
              <motion.div key={exp._id} className="experience-card" variants={cardVariants}>
                <div className="experience-header">
                  <div>
                    <h4 className="experience-role">{he.decode(exp.role)}</h4>
                    <h5 className="experience-company">{he.decode(exp.company)}</h5>
                  </div>
                  <div className="experience-dates">{he.decode(exp.dates)}</div>
                </div>
                <ul className="experience-description">
                  {exp.description.map((point, i) => (
                    <li key={i}>{he.decode(point)}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default ExperienceSection;