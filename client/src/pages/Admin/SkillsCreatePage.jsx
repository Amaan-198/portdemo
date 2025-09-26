import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createSkill } from '../../api/apiService';

const SkillsCreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const skillsArray = formData.skills.split(',').map(skill => skill.trim());
      await createSkill({ ...formData, skills: skillsArray });
      navigate('/admin/skills');
    } catch (err) {
      setError('Failed to create skill category. Please check all fields.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Create New Skill Category</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Category Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="skills">
              <Form.Label>Skills (comma separated)</Form.Label>
              <Form.Control type="text" name="skills" value={formData.skills} onChange={handleChange} required />
              <Form.Text className="text-muted">
                e.g., Python, C++, Java
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="primary">Create Skill Category</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsCreatePage;