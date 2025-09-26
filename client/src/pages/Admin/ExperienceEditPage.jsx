import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getExperienceById, updateExperience } from '../../api/apiService';

const ExperienceEditPage = () => {
  const { id: experienceId } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [dates, setDates] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await getExperienceById(experienceId);
        setRole(data.role);
        setCompany(data.company);
        setDates(data.dates);
        // Join the array back into a comma-separated string for the textarea
        setDescription(data.description.join(', '));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experience data.');
        setLoading(false);
      }
    };
    fetchExperience();
  }, [experienceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const descriptionArray = description.split(',').map(item => item.trim());
    try {
      await updateExperience(experienceId, { role, company, dates, description: descriptionArray });
      navigate('/admin/experiences');
    } catch (err) {
      setError('Failed to update experience.');
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
        <Col md={8}>
          <h1>Edit Experience</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role / Position</Form.Label>
                <Form.Control type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="dates">
                <Form.Label>Dates</Form.Label>
                <Form.Control type="text" value={dates} onChange={(e) => setDates(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description (comma-separated)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                 <Form.Text className="text-muted">
                  Enter each bullet point separated by a comma.
                </Form.Text>
              </Form.Group>

              <Button type="submit" variant="primary">Update Experience</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ExperienceEditPage;