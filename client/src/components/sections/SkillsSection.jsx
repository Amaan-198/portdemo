import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import he from 'he';
import { getSkills } from '../../api/apiService';
import { motion } from 'framer-motion';
import useFetchData from '../../hooks/useFetchData';
import './SkillsSection.css';

const SkillsSection = () => {
  const { data: skillCategories, loading, error } = useFetchData(getSkills);

  const midpoint = Math.ceil(skillCategories.length / 2);
  const firstColumn = skillCategories.slice(0, midpoint);
  const secondColumn = skillCategories.slice(midpoint);

  const mainContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const categoryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const renderSkillColumn = (column) => (
    column.map((category) => (
      <motion.div key={category._id} className="mb-4" variants={categoryContainerVariants}>
        <h4 className="skill-category-title">{he.decode(category.title)}</h4>
        <motion.div className="skill-tags-container" variants={categoryContainerVariants}>
          {category.skills.map((skill) => (
            <motion.span key={skill} className="skill-tag" variants={tagVariants}>
              {he.decode(skill)}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    ))
  );

  return (
    <section id="skills" className="glass-section">
      <h2 className="display-5 fw-bold mb-5 text-center">Technical Skills</h2>
      {loading ? (
        <p className="text-center">Loading skills...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <motion.div
          className="skills-container"
          variants={mainContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Row>
            <Col md={6}>{renderSkillColumn(firstColumn)}</Col>
            <Col md={6}>{renderSkillColumn(secondColumn)}</Col>
          </Row>
        </motion.div>
      )}
    </section>
  );
};

export default SkillsSection;