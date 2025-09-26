import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getExperiences, deleteExperience } from '../../api/apiService';

const ExperienceListPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data } = await getExperiences();
      setExperiences(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch experiences');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(id);
        fetchExperiences(); // Refetch after deletion
      } catch (err) {
        setError('Could not delete experience.');
      }
    }
  };

  return (
    <Container fluid>
      <Row className="align-items-center my-4">
        <Col>
          <h1>Manage Experience</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/experiences/create">
            <Button variant="primary">
              Add Experience
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ROLE</th>
              <th>COMPANY</th>
              <th>DATES</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.role}</td>
                <td>{exp.company}</td>
                <td>{exp.dates}</td>
                <td>
                  <LinkContainer to={`/admin/experiences/${exp._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-1">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(exp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ExperienceListPage;