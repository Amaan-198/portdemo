import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { getEducation } from '../../api/apiService';
import he from 'he';
import { motion } from 'framer-motion';
import './EducationSection.css';

const EducationSection = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data } = await getEducation();
        setEducation(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch education data.');
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  const mainCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const entryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="education" className="my-5 py-5">
      <h2 className="display-5 fw-bold mb-5 text-center">Education</h2>
      {loading ? (
        <p className="text-center">Loading education...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <motion.div
          className="education-card"
          variants={mainCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {education.map((edu) => (
            <motion.div className="education-entry" key={edu._id} variants={entryVariants}>
              <div className="education-main-info">
                <FontAwesomeIcon icon={faGraduationCap} size="3x" className="education-icon" />
                <div>
                  <h4 className="education-degree">{he.decode(edu.degree)}</h4>
                  <p className="education-institution">{he.decode(edu.institution)}</p>
                </div>
              </div>
              <div className="education-details">
                <p className="education-dates">{he.decode(edu.dates)}</p>
                <p className="education-cgpa"><strong>CGPA:</strong> {edu.cgpa}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default EducationSection;