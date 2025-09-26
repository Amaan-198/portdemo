import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getExperiences, deleteExperience, reorderExperiences } from '../../api/apiService';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import he from 'he';

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
      const originalExperiences = [...experiences];
      setExperiences(experiences.filter((exp) => exp._id !== id));
      try {
        await deleteExperience(id);
      } catch (err) {
        setError('Could not delete experience. Please try again.');
        setExperiences(originalExperiences);
      }
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const originalExperiences = [...experiences];
    const items = Array.from(experiences);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setExperiences(items);
    const newOrder = items.map(item => item._id);
    try {
      await reorderExperiences(newOrder);
    } catch (err) {
      setError("Failed to reorder experiences. Reverting local changes.");
      setExperiences(originalExperiences);
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
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Experience
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>ROLE</th>
                <th>COMPANY</th>
                <th>DATES</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <Droppable droppableId="experiences-droppable">
              {(droppableProvided) => (
                <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                  {experiences.map((exp, index) => (
                    <Draggable key={exp._id} draggableId={exp._id} index={index}>
                      {(draggableProvided) => (
                        <tr ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                          <td><FontAwesomeIcon icon={faArrowsAlt} className="me-2 text-muted" />{index + 1}</td>
                          <td>{he.decode(exp.role)}</td>
                          <td>{he.decode(exp.company)}</td>
                          <td>{he.decode(exp.dates)}</td>
                          <td>
                            <ButtonGroup>
                              <LinkContainer to={`/admin/experiences/${exp._id}/edit`}>
                                <Button variant="light" className="btn-sm">
                                  Edit
                                </Button>
                              </LinkContainer>
                              <Button
                                variant="danger"
                                className="btn-sm"
                                onClick={() => deleteHandler(exp._id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
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

export default ExperienceListPage;