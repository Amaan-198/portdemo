import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getProjects, deleteProject, reorderProjects } from '../../api/apiService';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import he from 'he';

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await getProjects();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const originalProjects = [...projects];
      setProjects(projects.filter((p) => p._id !== id));
      try {
        await deleteProject(id);
      } catch (err) {
        setError('Could not delete project. Please try again.');
        setProjects(originalProjects);
      }
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const originalProjects = [...projects];
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjects(items);

    const newOrder = items.map(item => item._id);
    try {
      await reorderProjects(newOrder);
    } catch (err) {
      setError("Failed to reorder projects. Reverting local changes.");
      setProjects(originalProjects); // Revert on failure
    }
  };

  return (
    <Container>
      <Row className="align-items-center my-5">
        <Col><h1>Manage Projects</h1></Col>
        <Col className="text-end">
          <LinkContainer to="/admin/projects/create">
            <Button variant="primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Create Project
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
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <Droppable droppableId="projects-droppable">
              {(droppableProvided) => (
                <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                  {projects.map((project, index) => (
                    <Draggable key={project._id} draggableId={project._id} index={index}>
                      {(draggableProvided) => (
                        <tr ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                          <td><FontAwesomeIcon icon={faArrowsAlt} className="me-2 text-muted" />{index + 1}</td>
                          <td>{he.decode(project.title)}</td>
                          <td>{he.decode(project.category)}</td>
                          <td>
                            <LinkContainer to={`/admin/projects/${project._id}/edit`}>
                              <Button variant="light" className="btn-sm mx-1">Edit</Button>
                            </LinkContainer>
                            <Button variant="danger" className="btn-sm mx-1" onClick={() => deleteHandler(project._id)}>Delete</Button>
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

export default ProjectListPage;