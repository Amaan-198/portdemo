import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import he from 'he';
import { getExperiences } from '../../api/apiService';

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

      {loading ? (
        <p>Loading experience...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        experiences.map((exp) => (
          <Row key={exp._id} className="mb-4">
            <Col md={10} lg={9}>
              <div className="d-flex">
                <div className="pe-4 text-muted">
                  <strong>{he.decode(exp.dates)}</strong>
                </div>
                <div className="border-start ps-4">
                  <h4>{he.decode(exp.role)}</h4>
                  <h5 className="text-primary">{he.decode(exp.company)}</h5>
                  <ul>
                    {exp.description.map((point, i) => (
                      <li key={i}>{he.decode(point)}</li>
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