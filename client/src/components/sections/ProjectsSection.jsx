import React, { useState } from 'react';
import { Container, Row, Col, Alert, Carousel } from 'react-bootstrap';
import ProjectCard from '../ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { getProjects } from '../../api/apiService';
import he from 'he';
import useFetchData from '../../hooks/useFetchData';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const { data: projects, loading, error } = useFetchData(getProjects);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || 'Uncategorized';
    (acc[category] = acc[category] || []).push(project);
    return acc;
  }, {});

  return (
    <section id="projects" className="content-section">
      <Container>
        <div className="section-container-glass">
          <h2 className="display-5 fw-bold mb-5 text-center">My Projects</h2>
          {loading ? (
            <p className="text-center">Loading projects...</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
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

        {showModal && selectedProject && (
          <div className="project-modal-overlay" onClick={handleCloseModal}>
            <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={handleCloseModal}>&times;</button>
              <div className="modal-top-section">
                <h2 className="modal-title">{he.decode(selectedProject.title)}</h2>
                <p className="modal-subtitle">{he.decode(selectedProject.category)}</p>
              </div>
              <div className="modal-gallery-container">
                <Carousel interval={null}>
                  {selectedProject.imageUrls.map((url, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 modal-image"
                        src={url}
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <p className="modal-description">{he.decode(selectedProject.extendedDescription)}</p>
              <div className="modal-action-buttons">
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-btn live-demo-btn">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                    Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-btn github-repo-btn">
                    <FontAwesomeIcon icon={faGithub} className="me-2" />
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSection;