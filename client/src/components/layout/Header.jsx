import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const navLinks = [
    { title: 'About', id: 'about' },
    { title: 'Experience', id: 'experience' },
    { title: 'Projects', id: 'projects' },
    { title: 'Achievements', id: 'achievements' },
    { title: 'Skills', id: 'skills' },
  ];

  const [activeLink, setActiveLink] = useState('');

  return (
    <header className="main-header">
      <div className="header-container">
        <ScrollLink
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="header-brand"
          onClick={() => setActiveLink('')} // Clear active link when returning home
        >
          Amaan Ahmed Shaikh
        </ScrollLink>
        <nav className="header-nav">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.id}
              to={link.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="header-nav-link"
              activeClass="active" // Use react-scroll's active class
              onSetActive={() => setActiveLink(link.id)}
            >
              {link.title}
              {activeLink === link.id && (
                <motion.div
                  className="active-link-indicator"
                  layoutId="activeLinkIndicator"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </ScrollLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;