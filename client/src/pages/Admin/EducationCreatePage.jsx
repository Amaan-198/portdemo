import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createEducation } from '../../api/apiService';

const EducationCreatePage = () => {
  const [formData, setFormData] = useState({ degree: '', institution: '', dates: '', cgpa: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEducation(formData);
      navigate('/admin/education');
    } catch (err) {
      setError('Failed to create education entry.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Add Education Entry</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="degree"><Form.Label>Degree</Form.Label><Form.Control type="text" name="degree" value={formData.degree} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3" controlId="institution"><Form.Label>Institution</Form.Label><Form.Control type="text" name="institution" value={formData.institution} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3" controlId="dates"><Form.Label>Dates</Form.Label><Form.Control type="text" name="dates" value={formData.dates} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3" controlId="cgpa"><Form.Label>CGPA</Form.Label><Form.Control type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} required /></Form.Group>
            <Button type="submit" variant="primary">Create Entry</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EducationCreatePage;