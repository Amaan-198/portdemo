import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { getEducation } from '../../api/apiService';
import he from 'he';

const EducationSection = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // This is the logic that was missing
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
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <Container id="education" className="my-5 py-5">
      <h2 className="display-5 fw-bold mb-5">Education</h2>
      {loading ? <p>Loading education...</p> : error ? <Alert variant="danger">{error}</Alert> : (
        <Row>
          {education.map((edu) => (
            <Col md={10} lg={9} key={edu._id} className="mb-4">
              <div className="d-flex align-items-start">
                <FontAwesomeIcon icon={faGraduationCap} size="3x" className="text-primary me-4 mt-1" />
                <div>
                  <h4 className="fw-bold">{he.decode(edu.degree)}</h4>
                  <h5>{he.decode(edu.institution)}</h5>
                  <p className="text-muted mb-1">{he.decode(edu.dates)}</p>
                  <p className="text-muted"><strong>CGPA:</strong> {edu.cgpa}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EducationSection;