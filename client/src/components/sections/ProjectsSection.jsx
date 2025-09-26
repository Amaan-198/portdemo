import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Alert, Carousel } from 'react-bootstrap';
import ProjectCard from '../ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { getProjects } from '../../api/apiService';
import he from 'he';
import './ProjectsSection.css'; // Import the new CSS file

const ProjectsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch projects from the server.');
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const groupedProjects = projects.reduce((acc, project) => {
    (acc[project.category] = acc[project.category] || []).push(project);
    return acc;
  }, {});

  return (
    <Container id="projects" className="my-5 py-5">
      <h2 className="display-5 fw-bold mb-5">My Projects</h2>
      {loading ? <p>Loading projects...</p> : error ? <Alert variant="danger">{error}</Alert> : (
        Object.entries(groupedProjects).map(([category, projectsInCategory]) => (
          <div key={category} className="mb-5">
            <h3 className="mb-4">{he.decode(category)}</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
              {projectsInCategory.map((project) => (
                <Col key={project._id}>
                  <ProjectCard {...project} onReadMore={() => handleShowModal(project)} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      )}

      {selectedProject && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{he.decode(selectedProject.title)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {selectedProject.imageUrls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img src={url} alt={`${he.decode(selectedProject.title)} - view ${index + 1}`} className="d-block w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
            <p className="mt-3">{he.decode(selectedProject.extendedDescription)}</p>
          </Modal.Body>
          <Modal.Footer>
            {selectedProject.githubUrl && (
              <Button variant="outline-dark" href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="me-2" />
                View Code
              </Button>
            )}
            {selectedProject.liveUrl && (
              <Button variant="primary" href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                Live Demo
              </Button>
            )}
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ProjectsSection;