import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Alert } from 'react-bootstrap';
import { getSkills } from '../../api/apiService';
import './SkillsSection.css';

const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const { data } = await getSkills();
        setSkillCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch skills.');
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Logic to split the categories into two columns for a clean layout
  const midpoint = Math.ceil(skillCategories.length / 2);
  const firstColumn = skillCategories.slice(0, midpoint);
  const secondColumn = skillCategories.slice(midpoint);

  const renderSkillColumn = (column) => (
    column.map((category, index) => (
      <div key={index} className="mb-4">
        <h4 className="fw-bold">{category.title}</h4>
        <div className="d-flex flex-wrap">
          {category.skills.map((skill, i) => (
            <Badge key={i} pill className="skill-badge me-2 mb-2">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    ))
  );

  return (
    <Container id="skills" className="my-5 py-5 bg-light">
      <h2 className="display-5 fw-bold mb-5">Technical Skills</h2>
      {loading ? (
        <p>Loading skills...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          <Col md={6}>{renderSkillColumn(firstColumn)}</Col>
          <Col md={6}>{renderSkillColumn(secondColumn)}</Col>
        </Row>
      )}
    </Container>
  );
};

export default SkillsSection;