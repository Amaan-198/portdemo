import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Spinner, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProject, uploadImages } from '../../api/apiService';

const ProjectCreatePage = () => {
  const [formData, setFormData] = useState({
  title: '', category: '', description: '', extendedDescription: '',
  imageUrls: [], badge: '', githubUrl: '', liveUrl: '',
});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const uploadFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append('images', files[i]);
    }

    setUploading(true);
    try {
      const { data } = await uploadImages(uploadFormData);
      setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...data] });
      setUploading(false);
    } catch (error) {
      setError('Image upload failed. Please try again.');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
        setError('Please upload at least one image.');
        return;
    }
    setError('');
    try {
      await createProject(formData);
      navigate('/admin/projects');
    } catch (err) {
      setError('Failed to create project.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Create New Project</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={uploadFileHandler}
              />
              {uploading && <Spinner animation="border" size="sm" className="mt-2" />}
            </Form.Group>

            {formData.imageUrls.length > 0 && (
              <div className="mb-3">
                <p>Uploaded Images:</p>
                <div className="d-flex flex-wrap">
                  {formData.imageUrls.map((url, index) => (
                    <Image key={index} src={url} thumbnail width="100" className="me-2 mb-2" />
                  ))}
                </div>
              </div>
            )}
            
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Short Description (for card)</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="extendedDescription">
              <Form.Label>Extended Description (for modal)</Form.Label>
              <Form.Control as="textarea" rows={5} name="extendedDescription" value={formData.extendedDescription} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="badge">
              <Form.Label>Badge (e.g., "Patented", optional)</Form.Label>
              <Form.Control type="text" name="badge" value={formData.badge} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="githubUrl">
              <Form.Label>GitHub URL (optional)</Form.Label>
              <Form.Control type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="liveUrl">
              <Form.Label>Live Demo URL (optional)</Form.Label>
              <Form.Control type="text" name="liveUrl" value={formData.liveUrl} onChange={handleChange} />
            </Form.Group>

            <Button type="submit" variant="primary">Create Project</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectCreatePage;