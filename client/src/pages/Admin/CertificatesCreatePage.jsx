import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createCertificate } from '../../api/apiService';

const CertificatesCreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    url: "",
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
      await createCertificate(formData);
      navigate('/admin/certificates');
    } catch (err) {
      setError('Failed to create certificate. Please check all fields.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Create New Certificate</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="issuer">
              <Form.Label>Issuer</Form.Label>
              <Form.Control type="text" name="issuer" value={formData.issuer} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="url">
              <Form.Label>Verification URL</Form.Label>
              <Form.Control type="text" name="url" value={formData.url} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary">Create Certificate</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CertificatesCreatePage;