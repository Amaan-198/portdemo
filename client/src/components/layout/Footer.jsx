import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.footer
      className="main-footer"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="footer-container">
        <div className="footer-social-links">
          <a
            href="https://www.linkedin.com/in/amaanahmed8097"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="mailto:shaikhamaanahmed@gmail.com"
            className="footer-social-icon"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href="https://github.com/amaanahmed8097"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {currentYear} Amaan Ahmed Shaikh. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;