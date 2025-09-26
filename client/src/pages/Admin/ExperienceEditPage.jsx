import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getExperienceById, updateExperience } from '../../api/apiService';
import he from 'he';

const ExperienceEditPage = () => {
  const { id: experienceId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    dates: '',
    description: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await getExperienceById(experienceId);
        // Decode HTML entities
        const decodedData = {
          ...data,
          role: data.role ? he.decode(data.role) : '',
          company: data.company ? he.decode(data.company) : '',
          dates: data.dates ? he.decode(data.dates) : '',
          description: data.description ? data.description.map(d => he.decode(d)) : [],
        };
        setFormData(decodedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experience data.');
        setLoading(false);
      }
    };
    fetchExperience();
  }, [experienceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value.split('\n') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExperience(experienceId, formData);
      navigate('/admin/experiences');
    } catch (err) {
      setError('Failed to update experience.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Experience</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dates">
                <Form.Label>Dates</Form.Label>
                <Form.Control
                  type="text"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description (one point per line)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description.join('\n')}
                  onChange={handleDescriptionChange}
                  required
                />
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