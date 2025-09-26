import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getCertificateById, updateCertificate } from '../../api/apiService';
import he from 'he';

const CertificateEditPage = () => {
  const { id: certificateId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    url: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const { data } = await getCertificateById(certificateId);
        // Decode HTML entities
        const decodedData = {
          ...data,
          title: data.title ? he.decode(data.title) : '',
          issuer: data.issuer ? he.decode(data.issuer) : '',
        };
        setFormData(decodedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch certificate data.');
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCertificate(certificateId, formData);
      navigate('/admin/certificates');
    } catch (err) {
      setError('Failed to update certificate.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Certificate</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="issuer">
                <Form.Label>Issuer</Form.Label>
                <Form.Control
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="url">
                <Form.Label>Credential URL (optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" variant="primary">Update Certificate</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CertificateEditPage;