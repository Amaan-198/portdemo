import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAchievements, deleteAchievement } from '../../api/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AchievementListPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const { data } = await getAchievements();
      setAchievements(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch achievements');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteAchievement(id);
        fetchAchievements(); // Refetch achievements to update the list after deletion
      } catch (err) {
        setError('Could not delete achievement.');
      }
    }
  };

  return (
    <Container>
      <Row className="align-items-center my-5">
        <Col>
          <h1>Manage Achievements</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/achievements/create">
            <Button variant="primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Create Achievement
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((achievement) => (
              <tr key={achievement._id}>
                <td>{achievement.title}</td>
                <td>{achievement.description}</td>
                <td>
                  <LinkContainer to={`/admin/achievements/${achievement._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-1">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(achievement._id)}
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

export default AchievementListPage;