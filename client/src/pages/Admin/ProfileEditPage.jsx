import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, uploadImages } from '../../api/apiService';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", headline: "", about: "", profilePhoto: "", resumeUrl: "" });
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        if (data) setFormData(data);
        setLoading(false);
      } catch (err) { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const uploadPhotoHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadFormData = new FormData();
    uploadFormData.append('images', file);
    setUploadingPhoto(true);
    try {
      const { data } = await uploadImages(uploadFormData);
      setFormData({ ...formData, profilePhoto: data[0] });
      setUploadingPhoto(false);
    } catch (error) {
      setError('Photo upload failed.');
      setUploadingPhoto(false);
    }
  };

  const handlePhotoRemove = () => {
    setFormData({ ...formData, profilePhoto: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Profile</h1>
          {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
            <Form onSubmit={handleSubmit}>
              {/* ...Name, Headline, About, and Photo sections are unchanged... */}
              <Form.Group className="mb-3" controlId="name"><Form.Label>Full Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="headline"><Form.Label>Professional Headline</Form.Label><Form.Control type="text" name="headline" value={formData.headline} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="about"><Form.Label>About Me Paragraph</Form.Label><Form.Control as="textarea" rows={5} name="about" value={formData.about} onChange={handleChange} required /></Form.Group>
              <Form.Group controlId="profilePhoto" className="mb-3"><Form.Label>Profile Photo</Form.Label><Form.Control type="file" onChange={uploadPhotoHandler} accept="image/*" />{uploadingPhoto && <Spinner animation="border" size="sm" className="mt-2" />}</Form.Group>
              {formData.profilePhoto && (<div className="mb-3"><p>Current Photo:</p><Image src={formData.profilePhoto} thumbnail width="150" /><Button variant="outline-danger" size="sm" className="ms-3" onClick={handlePhotoRemove}>Remove Photo</Button></div>)}

              {/* --- REVERTED RESUME SECTION --- */}
              <Form.Group className="mb-3" controlId="resumeUrl">
                <Form.Label>Resume Filename</Form.Label>
                <Form.Control 
                  type="text" 
                  name="resumeUrl" 
                  value={formData.resumeUrl} 
                  onChange={handleChange} 
                  placeholder="e.g., /Amaan-Ahmed-Shaikh-Resume.pdf"
                />
                <Form.Text className="text-muted">
                  The file must be in the `client/public` folder.
                </Form.Text>
              </Form.Group>
              
              <Button type="submit" variant="primary">Update Profile</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEditPage;