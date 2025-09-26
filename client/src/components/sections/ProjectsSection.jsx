import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Alert, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { getProjects } from '../../api/apiService';
import he from 'he';
import './ProjectsSection.css';

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

  return (
    <div id="projects" className="projects-section">
      <Container>
        <h2 className="display-5 fw-bold text-center text-white mb-5">My Projects</h2>
        {loading ? <p className="text-center text-white">Loading projects...</p> : error ? <Alert variant="danger">{error}</Alert> : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card" onClick={() => handleShowModal(project)}>
                <img src={project.imageUrls[0]} alt={he.decode(project.title)} className="project-card-img" />
                <div className="project-card-body">
                  <h4 className="project-card-title">{he.decode(project.title)}</h4>
                  <p className="project-card-subtitle">{he.decode(project.subtitle)}</p>
                  <div className="project-card-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="project-card-tag">{he.decode(tech)}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {selectedProject && (
        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="project-modal" centered>
          <Modal.Header closeButton>
            <div>
              <Modal.Title as="h3">{he.decode(selectedProject.title)}</Modal.Title>
              <p className="text-white-50 mb-0">{he.decode(selectedProject.subtitle)}</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {selectedProject.imageUrls.map((url) => (
                <Carousel.Item key={url}>
                  <img src={url} alt={`${he.decode(selectedProject.title)} - view`} className="d-block w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
            <p className="mt-4">{he.decode(selectedProject.extendedDescription)}</p>
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
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ProjectsSection;