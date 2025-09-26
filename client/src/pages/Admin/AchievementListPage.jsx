import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAchievements, deleteAchievement, reorderAchievements } from '../../api/apiService';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

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
      const originalAchievements = [...achievements];
      setAchievements(achievements.filter((ach) => ach._id !== id));
      try {
        await deleteAchievement(id);
      } catch (err) {
        setError('Could not delete achievement. Please try again.');
        setAchievements(originalAchievements);
      }
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const originalAchievements = [...achievements];
    const items = Array.from(achievements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setAchievements(items);
    const newOrder = items.map(item => item._id);
    try {
      await reorderAchievements(newOrder);
    } catch (err) {
      setError("Failed to reorder achievements. Reverting local changes.");
      setAchievements(originalAchievements);
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <Droppable droppableId="achievements-droppable">
              {(droppableProvided) => (
                <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                  {achievements.map((achievement, index) => (
                    <Draggable key={achievement._id} draggableId={achievement._id} index={index}>
                      {(draggableProvided) => (
                        <tr ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                          <td><FontAwesomeIcon icon={faArrowsAlt} className="me-2 text-muted" />{index + 1}</td>
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
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      )}
    </Container>
  );
};

export default AchievementListPage;