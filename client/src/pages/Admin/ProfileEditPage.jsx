import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../api/apiService';
import he from 'he';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    aboutNarrative: '',
    aboutSkills: [],
    profilePhoto: '',
    resumeUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        // Decode HTML entities
        const decodedData = {
          ...data,
          name: data.name ? he.decode(data.name) : '',
          headline: data.headline ? he.decode(data.headline) : '',
          aboutNarrative: data.aboutNarrative ? he.decode(data.aboutNarrative) : '',
          aboutSkills: data.aboutSkills ? data.aboutSkills.map(s => he.decode(s)) : [],
        };
        setFormData(decodedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSkillsChange = (e) => {
    setFormData({ ...formData, aboutSkills: e.target.value.split(',').map(s => s.trim()) });
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
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="headline">
                <Form.Label>Headline</Form.Label>
                <Form.Control type="text" name="headline" value={formData.headline} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="aboutNarrative">
                <Form.Label>About Narrative</Form.Label>
                <Form.Control as="textarea" rows={5} name="aboutNarrative" value={formData.aboutNarrative} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="aboutSkills">
                <Form.Label>About Skills (comma-separated)</Form.Label>
                <Form.Control as="textarea" rows={3} name="aboutSkills" value={formData.aboutSkills.join(', ')} onChange={handleSkillsChange} required />
              </Form.Group>
               <Form.Group className="mb-3" controlId="profilePhoto">
                <Form.Label>Profile Photo URL</Form.Label>
                <Form.Control type="text" name="profilePhoto" value={formData.profilePhoto} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="resumeUrl">
                <Form.Label>Resume URL</Form.Label>
                <Form.Control type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} />
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