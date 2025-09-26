import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getAchievementById, updateAchievement } from '../../api/apiService';

const AchievementEditPage = () => {
  const { id: achievementId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const { data } = await getAchievementById(achievementId);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch achievement data.');
        setLoading(false);
      }
    };
    fetchAchievement();
  }, [achievementId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAchievement(achievementId, formData);
      navigate('/admin/achievements');
    } catch (err) {
      setError('Failed to update achievement.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Edit Achievement</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit" variant="primary">Update Achievement</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AchievementEditPage;