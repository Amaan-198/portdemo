import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getEducationById, updateEducation } from '../../api/apiService';

const EducationEditPage = () => {
  const { id: eduId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ degree: '', institution: '', dates: '', cgpa: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEducationItem = async () => {
      try {
        const { data } = await getEducationById(eduId);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch education data.');
        setLoading(false);
      }
    };
    fetchEducationItem();
  }, [eduId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEducation(eduId, formData);
      navigate('/admin/education');
    } catch (err) {
      setError('Failed to update education entry.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Education Entry</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="degree"><Form.Label>Degree</Form.Label><Form.Control type="text" name="degree" value={formData.degree} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="institution"><Form.Label>Institution</Form.Label><Form.Control type="text" name="institution" value={formData.institution} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="dates"><Form.Label>Dates</Form.Label><Form.Control type="text" name="dates" value={formData.dates} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="cgpa"><Form.Label>CGPA</Form.Label><Form.Control type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} required /></Form.Group>
              <Button type="submit" variant="primary">Update Entry</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EducationEditPage;