import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-4 mt-auto">
      <Container className="text-center">
        <div className="mb-3">
          <a href="https://www.linkedin.com/in/amaanahmed8097" target="_blank" rel="noopener noreferrer" className="text-dark me-4">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="mailto:shaikhamaanahmed@gmail.com" className="text-dark me-4">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
        <p className="mb-0">
          &copy; {currentYear} Amaan Ahmed Shaikh. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;