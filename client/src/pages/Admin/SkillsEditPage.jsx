import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getSkillById, updateSkill } from '../../api/apiService';
import he from 'he';

const SkillsEditPage = () => {
  const { id: skillId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const { data } = await getSkillById(skillId);
        // Decode HTML entities
        const decodedData = {
          ...data,
          title: data.title ? he.decode(data.title) : '',
          skills: data.skills ? data.skills.map(s => he.decode(s)) : [],
        };
        setFormData(decodedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skill data.');
        setLoading(false);
      }
    };
    fetchSkill();
  }, [skillId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSkill(skillId, formData);
      navigate('/admin/skills');
    } catch (err) {
      setError('Failed to update skill category.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Skill Category</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="skills">
                <Form.Label>Skills (comma-separated)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">Update Skills</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsEditPage;