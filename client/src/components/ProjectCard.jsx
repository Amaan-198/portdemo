import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import he from 'he';
import './ProjectCard.css';

const ProjectCard = ({ title, description, imageUrls, badge, onReadMore }) => {
  return (
    <Card className="h-100 shadow-sm project-card">
      <Card.Img variant="top" src={imageUrls[0]} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{he.decode(title)}</Card.Title>
        {badge && <Badge bg="primary" className="mb-2 align-self-start">{he.decode(badge)}</Badge>}
        <Card.Text className="flex-grow-1">{he.decode(description)}</Card.Text>
      </Card.Body>
      <Card.Footer className="border-0 bg-white">
        <button onClick={onReadMore} className="btn-link-style read-more-link">
          Read More <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
        </button>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;