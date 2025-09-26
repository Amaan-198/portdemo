import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, uploadImages } from '../../api/apiService';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  // Update state to match new schema
  const [formData, setFormData] = useState({ name: "", headline: "", aboutNarrative: "", aboutSkills: [], profilePhoto: "", resumeUrl: "" });
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        // Ensure skills is an array, even if it's missing
        if (data) setFormData({ ...data, aboutSkills: data.aboutSkills || [] });
        setLoading(false);
      } catch (err) { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for the skills textarea
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData({ ...formData, aboutSkills: skillsArray });
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
              <Form.Group className="mb-3" controlId="name"><Form.Label>Full Name</Form.Label><Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="headline"><Form.Label>Professional Headline</Form.Label><Form.Control type="text" name="headline" value={formData.headline || ''} onChange={handleChange} required /></Form.Group>

              {/* Updated fields for Bento Grid */}
              <Form.Group className="mb-3" controlId="aboutNarrative"><Form.Label>My Journey (Narrative)</Form.Label><Form.Control as="textarea" rows={5} name="aboutNarrative" value={formData.aboutNarrative || ''} onChange={handleChange} /></Form.Group>
              <Form.Group className="mb-3" controlId="aboutSkills"><Form.Label>Core Skills</Form.Label><Form.Control as="textarea" rows={3} name="aboutSkills" value={formData.aboutSkills.join(', ')} onChange={handleSkillsChange} /><Form.Text className="text-muted">Enter skills separated by commas (e.g., React, Node.js, CSS)</Form.Text></Form.Group>

              <Form.Group controlId="profilePhoto" className="mb-3"><Form.Label>Profile Photo (Headshot)</Form.Label><Form.Control type="file" onChange={uploadPhotoHandler} accept="image/*" />{uploadingPhoto && <Spinner animation="border" size="sm" className="mt-2" />}</Form.Group>
              {formData.profilePhoto && (<div className="mb-3"><p>Current Photo:</p><Image src={formData.profilePhoto} thumbnail width="150" /><Button variant="outline-danger" size="sm" className="ms-3" onClick={handlePhotoRemove}>Remove</Button></div>)}
              <Form.Group className="mb-3" controlId="resumeUrl"><Form.Label>Resume Link (URL)</Form.Label><Form.Control type="url" name="resumeUrl" value={formData.resumeUrl || ''} onChange={handleChange} placeholder="e.g., https://docs.google.com/document/d/..." /><Form.Text className="text-muted">Paste the full URL to your resume (e.g., a Google Drive or Dropbox link).</Form.Text></Form.Group>
              
              <Button type="submit" variant="primary">Update Profile</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEditPage;