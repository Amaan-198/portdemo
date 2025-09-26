import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Spinner, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject, uploadImages } from '../../api/apiService';
import he from 'he';

const ProjectEditPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    extendedDescription: '',
    imageUrls: [],
    badge: '',
    githubUrl: '',
    liveUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await getProjectById(projectId);
        // Decode HTML entities before setting the form data
        const decodedData = {
          ...data,
          title: data.title ? he.decode(data.title) : '',
          category: data.category ? he.decode(data.category) : '',
          description: data.description ? he.decode(data.description) : '',
          extendedDescription: data.extendedDescription ? he.decode(data.extendedDescription) : '',
          badge: data.badge ? he.decode(data.badge) : '',
        };
        setFormData(decodedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch project data.');
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

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

  const handleImageDelete = (urlToDelete) => {
    const updatedImageUrls = formData.imageUrls.filter((url) => url !== urlToDelete);
    setFormData({ ...formData, imageUrls: updatedImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.imageUrls.length === 0) {
      setError('A project must have at least one image.');
      return;
    }
    try {
      await updateProject(projectId, formData);
      navigate('/admin/projects');
    } catch (err) {
      setError('Failed to update project.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Project</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title"><Form.Label>Title</Form.Label><Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="category"><Form.Label>Category</Form.Label><Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required /></Form.Group>
              
              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Add More Images</Form.Label>
                <Form.Control type="file" multiple onChange={uploadFileHandler} />
                {uploading && <Spinner animation="border" size="sm" className="mt-2" />}
              </Form.Group>

              {formData.imageUrls && formData.imageUrls.length > 0 && (
                <div className="mb-3">
                  <p>Current Images:</p>
                  <div className="d-flex flex-wrap">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="position-relative d-inline-block me-2 mb-2">
                        <Image src={url} thumbnail width="100" />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0"
                          style={{ borderRadius: '50%', lineHeight: '1', padding: '0.1rem 0.3rem' }}
                          onClick={() => handleImageDelete(url)}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Form.Group className="mb-3" controlId="description"><Form.Label>Short Description</Form.Label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="extendedDescription"><Form.Label>Extended Description</Form.Label><Form.Control as="textarea" rows={5} name="extendedDescription" value={formData.extendedDescription} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="badge"><Form.Label>Badge (optional)</Form.Label><Form.Control type="text" name="badge" value={formData.badge} onChange={handleChange} /></Form.Group>
              <Form.Group className="mb-3" controlId="githubUrl"><Form.Label>GitHub URL (optional)</Form.Label><Form.Control type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} /></Form.Group>
              <Form.Group className="mb-3" controlId="liveUrl"><Form.Label>Live Demo URL (optional)</Form.Label><Form.Control type="text" name="liveUrl" value={formData.liveUrl} onChange={handleChange} /></Form.Group>
              
              <Button type="submit" variant="primary">Update Project</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectEditPage;