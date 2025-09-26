import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createExperience } from '../../api/apiService';

const ExperienceCreatePage = () => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [dates, setDates] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Convert comma-separated description into an array
    const descriptionArray = description.split(',').map(item => item.trim());

    try {
      await createExperience({ role, company, dates, description: descriptionArray });
      navigate('/admin/experience'); // Redirect to experience list on success
    } catch (err) {
      setError('Failed to create experience. Please check all fields.');
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
        <Col md={8}>
          <h1>Add New Experience</h1>
          {error && <Alert variant="danger">{error}</Alert>}
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
              <Form.Control type="text" value={dates} onChange={(e) => setDates(e.target.value)} required placeholder="e.g., Oct 2024 - Dec 2024" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description (comma-separated)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="e.g., Point one, Point two, Point three"
              />
              <Form.Text className="text-muted">
                Enter each bullet point separated by a comma.
              </Form.Text>
            </Form.Group>

            <Button type="submit" variant="primary">Add Experience</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ExperienceCreatePage;