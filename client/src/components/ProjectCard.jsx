import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import he from 'he';
import './ProjectCard.css';

const ProjectCard = ({ title, category, description, imageUrls, onReadMore }) => {
  return (
    <div className="project-card-glass" onClick={onReadMore}>
      <div className="project-card-content">
        <div className="project-title-container">
          <h4 className="project-title">{he.decode(title)}</h4>
          <p className="project-subtitle">{he.decode(category)}</p>
        </div>
        <div className="project-media-container">
          <img src={imageUrls[0]} alt={`${he.decode(title)} animation`} className="project-media" />
        </div>
        <p className="project-description">{he.decode(description)}</p>
        <button className="read-more-btn">
          View Project <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;