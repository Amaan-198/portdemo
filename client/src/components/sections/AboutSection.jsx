import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { getProfile } from '../../api/apiService';

const AboutSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await getProfile();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch profile data.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading about me...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container id="about" className="my-5 py-5">
      <Row>
        <Col md={8} lg={7}>
          <h2 className="display-5 fw-bold">About Me</h2>
          <hr className="my-4" style={{ width: '50px', height: '3px' }} />
          <p className="lead text-muted">
            {profile?.about}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;