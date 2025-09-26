import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { getExperiences } from '../../api/apiService'; // 1. Import the API function

// The hardcoded 'experiences' array is now removed.

const ExperienceSection = () => {
  // 2. Add state for experiences, loading, and errors
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. Fetch data when the component loads
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await getExperiences();
        setExperiences(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch professional experience.');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <Container id="experience" className="my-5 py-5 bg-light">
      <h2 className="display-5 fw-bold mb-5">Professional Experience</h2>

      {/* 4. Add conditional rendering for loading/error states */}
      {loading ? (
        <p>Loading experience...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        experiences.map((exp, index) => (
          <Row key={index} className="mb-4">
            <Col md={10} lg={9}>
              <div className="d-flex">
                <div className="pe-4 text-muted">
                  <strong>{exp.dates}</strong>
                </div>
                <div className="border-start ps-4">
                  <h4>{exp.role}</h4>
                  <h5 className="text-primary">{exp.company}</h5>
                  <ul>
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default ExperienceSection;