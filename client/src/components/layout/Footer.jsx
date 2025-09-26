import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { getProfile } from '../../api/apiService';
import './Footer.css';

const Footer = () => {
  const [profile, setProfile] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Could not fetch profile for footer:", error);
      }
    };
    fetchProfile();
  }, []);

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
          {profile?.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="footer-social-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          )}
          {profile?.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
        </div>
        <p className="footer-copyright">
          &copy; {currentYear} Amaan Ahmed Shaikh. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;