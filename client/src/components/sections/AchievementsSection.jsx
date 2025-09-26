import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { getAchievements } from '../../api/apiService';

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const { data } = await getAchievements();
        setAchievements(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch achievements.');
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <Container id="achievements" className="my-5 py-5 bg-light">
      <h2 className="display-5 fw-bold mb-5">Awards & Achievements</h2>
      {loading ? (
        <p>Loading achievements...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {achievements.map((achievement, index) => (
            <div key={index} className="d-flex align-items-start mb-4">
              <FontAwesomeIcon
                icon={faTrophy}
                size="2x"
                className="text-primary me-4 mt-1"
              />
              <div>
                <h4 className="fw-bold">{achievement.title}</h4>
                <p className="text-muted">{achievement.description}</p>
              </div>
            </div>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AchievementsSection;