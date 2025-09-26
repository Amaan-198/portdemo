import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import he from 'he';
import { getAchievements } from '../../api/apiService';
import { motion } from 'framer-motion';
import useFetchData from '../../hooks/useFetchData';
import './AchievementsSection.css';

const AchievementsSection = () => {
  const { data: achievements, loading, error } = useFetchData(getAchievements);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="achievements">
      <Container>
        <div className="section-container-glass">
          <h2 className="display-5 fw-bold mb-5 text-center">Awards & Achievements</h2>
          {loading ? (
            <p className="text-center">Loading achievements...</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <motion.div
              className="achievements-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement._id}
                  className="achievement-item"
                  variants={itemVariants}
                >
                  <FontAwesomeIcon
                    icon={faTrophy}
                    size="2x"
                    className="achievement-icon"
                  />
                  <div>
                    <h4 className="achievement-title">{he.decode(achievement.title)}</h4>
                    <p className="achievement-description">{he.decode(achievement.description)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default AchievementsSection;